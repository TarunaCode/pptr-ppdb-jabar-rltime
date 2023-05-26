const compression = require("compression");
const socketIO = require("socket.io");
const chokidar = require("chokidar");
const express = require("express");
const http = require("http");
const path = require("path");
const fs = require("fs");

let poolingData = {};

const { RESULT_DIR, SCH_NPSN, OPTION_TYPE } = require("./lib/constant");
const PORT = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const Socket = socketIO(server);

const watcher = chokidar.watch(`${RESULT_DIR}/**/*.json`);

app.use(compression());

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => res.render("registrant-portal"));

Socket.on("connection", (io) => {
  io.emit("init", {
    data: poolingData,
    config: {
      SCH_NPSN,
      OPTION_TYPE,
    },
  });
});

watcher.on("add", (pa) => {
  const splitted = pa.split("/");
  const filename = splitted[splitted.length - 1];

  const data = require(pa);

  poolingData[filename] = data;
});
watcher.on("change", (pa) => {
  const splitted = pa.split("/");
  const filename = splitted[splitted.length - 1];

  const data = fs.readFileSync(pa, "utf8");

  if (data !== "") {
    if (JSON.stringify(poolingData[filename]) !== data) {
      poolingData[filename] = JSON.parse(data);
    }
  } else {
    console.log("File kosong,");
  }
});

server.listen(PORT, () =>
  console.log(`Listening on port ${PORT} | http://localhost:${PORT}`)
);

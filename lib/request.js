const requestWrapper = (page) => async (
  url,
  method = "GET",
  options = { body: undefined, headers: undefined }
) =>
  await page.evaluate(
    (datas) =>
      fetch(datas.url, {
        method: datas.method,
        body: datas.options.body,
        headers: datas.options.headers,
      })
        .then((response) => response.json())
        .catch((err) => {
          console.log(err);
        }),
    { url, method, options }
  );

module.exports = requestWrapper;

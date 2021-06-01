## Latar Belakang

Aplikasi ini dibuat untuk keperluan saya dalam ppdb untuk masuk SMA. Karena website ppdb tidak mungkin menghandle koneksi realtime dengan jumlah user sampai ribuan atau ratusan ribu, saya membuat aplikasi yang mengambil data memakai puppeteer dengan teknik fetch data setiap 2,5 detik ([XHR Long Polling](https://en.wikipedia.org/wiki/Push_technology#Long_polling)), dan menampilkannya ke tampilan web.

## Instalasi

Clone repositori ini dan install package yang diperlukan.

```sh
npm install
```

Copy file `.env.sample` dan ubah namanya menjadi `.env`. Isikan variabelnya, contoh:

```
EXPATH=/usr/bin/brave-browser
USERNAME=XXX
PASSWORD=XXX
```

Keterangan :

- `EXPATH`: Path executable google chrome atau chromium untuk puppeteer, baca [default runtime settings](https://github.com/puppeteer/puppeteer#default-runtime-settings) untuk informasi lebih lengkap.
- `USERNAME`: Username yang diberikan dari kartu ppdb
- `PASSWORD`: Password yang diberikan dari kartu ppdb

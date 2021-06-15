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
CITY=KOTA BEKASI
LEVEL=sma
TYPE=negeri
SCH_ID=608f85de78c5383cc367c3b1
OPTION_TYPE=prestasi-rapor
```

Keterangan :

- `EXPATH`: Path executable google chrome atau chromium untuk puppeteer, baca [default runtime settings](https://github.com/puppeteer/puppeteer#default-runtime-settings) untuk informasi lebih lengkap.
- `USERNAME`: Username yang diberikan dari kartu ppdb
- `PASSWORD`: Password yang diberikan dari kartu ppdb
- `CITY`: Kota/Kabupaten yang diperlukan untuk mengambil data seluruh sekolah disatu kawasan.
- `LEVEL`: Pilihan jenjang sekolah. Valuenya `sma`, `smk`, atau `slb`. Pastikan huruf kecil.
- `TYPE`: Tipe sekolah yang dituju, `swasta` atau `negeri`.
- `SCH_ID`: ID unique sekolah, data ini didapatkan setelah menjalankan `npm run getSchools`.
- `OPTION_TYPE`: Jalur pendaftaran, valuenya bisa berupa `abk`, `ketm`, `kondisi-tertentu`, `perpindahan` (Perpindahan tugas ortu / Anak Guru), `prestasi` (Kejuaraan), `prestasi-rapor`, dan `zonasi`.

## Penggunaan

Setup yang dilakukan paling utama adalah mengisi `EXPATH` dimana google chrome atau chromium berada. Untuk selanjutnya bisa melihat instruksi dibawah ini.

- #### Sebagai Pendaftar

  Aplikasi ini bisa digunakan sebagai pendaftar dengan mengisikan `USERNAME` dan `PASSWORD` dari kartu akun ppdb. Untuk first run, jalankan

  ```sh
  npm run getBio
  ```

  Di command line kedua bisa menjalankan `npm start`, buka tampilan webnya di http://localhost:3000.

- #### Bukan Pendaftar

  > Fitur ini bisa juga digunakan untuk pendaftar, jalankan `npm run getRegistrant` untuk mendapatkan data registrant setelah menjalankan getSchools. Buka http://localhost:3000/registrant untuk melihat datanya.

  Jika anda bukan pendatar, yang perlu diisi adalah `CITY`, `LEVEL`, `TYPE`, dan `OPTION_TYPE`. Ini diperlukan untuk mendapatkan `SCH_ID`, jalankan

  ```sh
  npm run getSchools
  ```

  Setelah menjalankan akan ada folder baru bernama folder `info` yang didalamnya ada file json. Ambil salah satu id-nya untuk mendapatkan data. Untuk mendapatkan pdf list pendaftar, jalankan

  ```sh
  npm run pdf-report
  ```

  Setelah menjalankan ini akan ada folder `result` yang didalamnya ada folder `pdf`. Akan ada file pdf yang berhasil diambil dari website ppdb yang mungkin sudah disortir.

  Jika ingin mendapatkan pdf dengan banyak sekolah, copy file `pdf.config.js.sample` menjadi `pdf.config.js`, isikan array variable `schools` untuk daftar sekolah yang ingin diambil datanya.

  > Catatan: nama sekolah harus ada di folder info semua file schools, jika tidak ada maka akan terjadi error karena tidak ada data id.

  Jalankan

  ```sh
  npm run pdf-report-a-lot
  ```

  Periksa folder `pdf` yang sama, file pdf yang dihasilkan.

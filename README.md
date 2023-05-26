## Latar Belakang

Aplikasi ini dibuat untuk keperluan saya dalam ppdb untuk masuk SMA. Karena website ppdb tidak mungkin menghandle koneksi realtime dengan jumlah user sampai ribuan atau ratusan ribu, saya membuat aplikasi yang mengambil data memakai puppeteer dengan teknik fetch data setiap 2,5 detik ([XHR Long Polling](https://en.wikipedia.org/wiki/Push_technology#Long_polling)), dan menampilkannya ke tampilan web.

## Instalasi

Clone repositori ini dan install package yang diperlukan.

```sh
pnpm install
```

Copy file `.env.sample` dan ubah namanya menjadi `.env`. Isikan variabelnya, contoh:

```
CITY=KOTA BEKASI
LEVEL=sma
TYPE=negeri
SCH_NPSN=20231718
OPTION_TYPE=prestasi-rapor
```

Keterangan :

- `CITY`: Kota/Kabupaten yang diperlukan untuk mengambil data seluruh sekolah disatu kawasan.
- `LEVEL`: Pilihan jenjang sekolah. Valuenya `sma`, `smk`, atau `slb`. Pastikan huruf kecil.
- `TYPE`: Tipe sekolah yang dituju, `swasta` atau `negeri`.
- `SCH_NPSN`: ID unique sekolah, data ini didapatkan setelah menjalankan `pnpm getSchools`.
- `OPTION_TYPE`: Jalur pendaftaran, valuenya bisa berupa `abk`, `ketm`, `kondisi-tertentu`, `perpindahan` (Perpindahan tugas ortu / Anak Guru), `prestasi` (Kejuaraan), `prestasi-rapor`, dan `zonasi`.

## Penggunaan

Jangan lupa untuk menambahkan value untuk keys `CITY`, `LEVEL`, `TYPE`, dan `OPTION_TYPE`. Instruksi dibawah ini perlu dijalankan mendapatkan `SCH_NPSN`, jalankan

```sh
pnpm getSchools
```

Setelah menjalankan akan ada folder baru bernama folder `info` yang didalamnya ada file json. Ambil salah satu value `npsn` untuk mendapatkan data berdasarkan sekolah spesifik. Untuk mendapatkan pdf list pendaftar sesuai `OPTION_TYPE` yang sudah di tetapkan, jalankan perintah

```sh
pnpm pdf-report
```

Setelah menjalankan ini akan ada folder `result` yang didalamnya ada folder `pdf`. Akan ada file pdf yang berhasil diambil dari website ppdb yang mungkin sudah disortir.

Jika ingin mendapatkan pdf dengan banyak sekolah, copy file `pdf.config.js.sample` menjadi `pdf.config.js`, isikan array variable `schools` untuk daftar sekolah yang ingin diambil datanya. Untuk `OPTION_TYPE`, secara otomatis akan mengambil data berdasarkan keseluruhan jalur yang diterima oleh sekolah yang bersangkutan.

> Catatan: nama sekolah harus ada di folder info semua file json yang berada dalam folder info, jika tidak ada maka akan terjadi error karena tidak ada data npsn sekolah.

Jalankan

```sh
pnpm pdf-report-a-lot
```

Periksa folder `result/pdf` yang sama, file pdf yang dihasilkan.

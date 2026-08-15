# Dicky Creative Works - Panduan Edit Website

Website ini dibuat agar mudah diedit tanpa perlu basic coding. Untuk mengganti isi website, cukup buka dan edit file `content.js`.

## Cara Membuka Website

1. Buka folder website ini.
2. Klik dua kali file `index.html`.
3. Website akan terbuka langsung di browser.

File utama:
- `index.html`: struktur halaman.
- `style.css`: warna, layout, font, animasi, dan visual design.
- `script.js`: logic website seperti render konten, filter portfolio, hamburger menu, dan smooth scroll.
- `content.js`: semua konten yang perlu diedit.
- `assets/profile.png`: foto profile.

## Cara Mengganti Foto Profile

1. Siapkan foto baru dengan format `.png`.
2. Ubah nama file foto menjadi `profile.png`.
3. Masukkan foto tersebut ke folder `assets`.
4. Jika muncul pertanyaan replace file, pilih replace.

Pastikan nama dan lokasi file tetap:

```text
assets/profile.png
```

## Cara Menambah Portfolio

1. Buka file `content.js`.
2. Cari komentar:

```js
// EDIT PORTFOLIO DI SINI
```

3. Di bagian `projects`, copy salah satu data portfolio.
4. Paste di bawah item terakhir.
5. Ganti `title`, `category`, `description`, `platform`, `link`, dan `tags`.

Contoh:

```js
{
  title: "Nama Project Baru",
  category: "AI Ads",
  description: "Deskripsi singkat project.",
  platform: "Instagram Reels, Meta Ads",
  link: "https://drive.google.com/file/d/ID-FILE/view?usp=sharing",
  orientation: "vertical",
  tags: ["AI Video", "Meta Ads", "UGC"]
}
```

Jika kamu menambah kategori baru, misalnya `Editing Ads`, tab filter akan otomatis muncul di website.

## Thumbnail dan Pemutar Video Otomatis

Kamu tidak perlu membuat thumbnail manual untuk link Google Drive atau YouTube.
Website akan membaca link project dan otomatis:

1. Mengambil thumbnail video.
2. Membuat thumbnail dan judul bisa diklik.
3. Menampilkan tombol `Watch Video`.
4. Membuka video dengan cara yang paling cocok untuk sumber videonya.

Pastikan file Google Drive sudah diatur ke `Anyone with the link` agar pengunjung dapat melihat thumbnail dan memutar videonya.

Link yang didukung otomatis:

- Google Drive (`drive.google.com`): thumbnail otomatis.
- YouTube dan YouTube Shorts: thumbnail otomatis dan video dibuka di popup player.
- Link file video langsung yang berakhiran `.mp4`, `.webm`, `.ogg`, atau `.mov`: diputar langsung di project card.

### Hover Preview dan Kontrol Video

Google Drive tidak memberikan URL stream video yang stabil untuk website. Agar video bisa:

- Otomatis preview saat di-hover pada desktop.
- Diputar langsung tanpa membuka website lain.
- Memiliki kontrol play/pause, mute, volume, timeline, dan fullscreen.

Tambahkan `videoSource` yang mengarah langsung ke file video:

```js
{
  title: "Nama Project",
  link: "https://drive.google.com/file/d/ID-FILE/view",
  videoSource: "assets/videos/nama-video.mp4",
  orientation: "vertical"
}
```

Simpan file MP4 di folder `assets/videos`, lalu tulis nama file yang sama pada `videoSource`.
`link` Google Drive tetap digunakan untuk mengambil thumbnail otomatis. `videoSource` digunakan untuk pemutar videonya, sehingga kamu tidak perlu membuat thumbnail sendiri.

Di desktop, video otomatis preview tanpa suara saat cursor diarahkan ke media. Setelah pengunjung menekan video atau tombol `Watch Video`, kontrol video dapat digunakan seperti biasa. Di HP, pengunjung cukup menyentuh video atau tombol `Watch Video`.

`videoSource` juga boleh berupa URL langsung dari layanan video/CDN, selama alamatnya berakhiran `.mp4`, `.webm`, `.ogg`, atau `.mov`.

Halaman Instagram biasa tidak selalu mengizinkan website mengambil thumbnail secara otomatis. Untuk link tersebut, website akan menampilkan placeholder dan membuka link aslinya.

Untuk project video vertical seperti Reels, Shorts, dan Meta Ads, gunakan:

```js
orientation: "vertical"
```

Untuk project horizontal seperti commercial video atau event video, gunakan:

```js
orientation: "landscape"
```

Jika ingin memakai gambar thumbnail pilihan sendiri, tambahkan:

```js
thumbnail: "assets/nama-thumbnail.png"
```

Thumbnail manual akan menggantikan thumbnail otomatis. Jika sumber videonya tidak didukung dan tidak ada thumbnail, website menampilkan placeholder gradient.

## Cara Mengganti Link WhatsApp, Email, dan Social Media

1. Buka file `content.js`.
2. Cari komentar:

```js
// EDIT CONTACT DI SINI
```

3. Ganti bagian `url`.

Contoh WhatsApp:

```js
url: "https://wa.me/6281234567890"
```

Contoh email:

```js
url: "mailto:nama@email.com"
```

Contoh Instagram:

```js
url: "https://instagram.com/username"
```

## Cara Mengganti Headline, Deskripsi, Services, dan Process

Semua ada di `content.js`.

Bagian penting:
- `// EDIT HERO DI SINI`: headline utama, deskripsi hero, tombol, dan role list.
- `// EDIT ABOUT DI SINI`: teks tentang kamu dan badge keahlian.
- `// EDIT PORTFOLIO DI SINI`: data portfolio.
- `// EDIT SERVICES DI SINI`: daftar service.
- `process`: step cara kerja.
- `// EDIT CONTACT DI SINI`: headline contact dan link.

## Cara Mengganti Warna Utama Website

1. Buka file `style.css`.
2. Cari bagian paling atas:

```css
:root {
```

3. Ganti kode warna sesuai kebutuhan.

Contoh warna utama:

```css
--yellow: #ffd21a;
--orange: #f36b21;
--red: #d9311f;
```

Untuk background utama, ganti:

```css
--bg: #080808;
```

Untuk warna kartu, ganti:

```css
--card: #141414;
--card-2: #1c1c1c;
```

## Cara Upload Website ke Hosting Sederhana

Pilihan mudah:

1. Netlify
   - Buka `https://netlify.com`.
   - Login atau daftar.
   - Drag folder website ini ke halaman deploy Netlify.
   - Tunggu proses selesai.
   - Website akan mendapatkan link otomatis.

2. Vercel
   - Buka `https://vercel.com`.
   - Login atau daftar.
   - Upload project atau hubungkan ke GitHub.
   - Deploy website.

3. GitHub Pages
   - Buat repository baru di GitHub.
   - Upload semua file website.
   - Buka Settings > Pages.
   - Pilih branch utama.
   - Simpan dan tunggu link website muncul.

Pastikan file ini ikut ter-upload:

```text
index.html
style.css
script.js
content.js
assets/profile.png
```

## Cara Mengecek Responsive Design

Gunakan cara ini untuk memastikan website rapi di desktop, tablet, dan HP.

1. Buka website di browser dengan klik dua kali `index.html`.
2. Klik kanan di halaman website.
3. Pilih `Inspect`.
4. Aktifkan mode mobile responsive. Biasanya icon berbentuk HP/tablet di bagian atas panel Inspect.
5. Cek beberapa ukuran layar:
   - `iPhone SE`
   - `iPhone 12/13/14`
   - Android medium size
   - iPad/tablet
6. Pastikan tidak ada horizontal scroll. Halaman hanya boleh scroll atas-bawah.
7. Pastikan menu hamburger muncul di mobile dan bisa dibuka/tutup.
8. Pastikan semua tombol mudah diklik.
9. Pastikan portfolio card tampil 1 kolom di mobile.
10. Pastikan portfolio tabs bisa digeser horizontal di mobile.
11. Pastikan foto profile tetap proporsional dan tidak terpotong aneh.

Jika ada teks yang terlalu panjang setelah kamu edit `content.js`, pendekkan teks tersebut atau pecah menjadi kalimat yang lebih singkat agar tetap nyaman dibaca di HP.

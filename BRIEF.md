# BRIEF: Website Redesign — dickynism.ink (v2)

## Role
Kamu adalah senior front-end designer-developer. Rombak total website portfolio berikut mengikuti referensi desain yang diberikan. Kerjakan dengan teliti, jaga kualitas premium, dan JANGAN merusak aset & mekanisme yang sudah ada.

## Referensi desain
https://www.pramudyadji.com/ — tiru arahannya (BUKAN menyalin):
- Gaya editorial premium, **dark theme** (latar gelap, aksen kuning/oranye milik brand Dicky)
- Tipografi BESAR & berkarakter (heading display, aksen italic pada kata kunci)
- Section bernomor (01 / 02 / 03)
- Gerakan halus: reveal on scroll, marquee logo, horizontal drag pada timeline
- Copy bahasa Indonesia dengan kepribadian (casual-profesional), plus versi English penuh

## Status saat ini
Project statis murni (HTML + CSS + vanilla JS, TANPA framework):
- `index.html` — kerangka, semua section di-render oleh JS
- `content.js` — SEMUA konten dalam satu object `websiteContent` (data-driven)
- `script.js` — renderer tiap section (renderHero, renderAbout, renderProjects, renderServices, renderProcess, renderFaq, renderContact, renderFooter, modal video)
- `style.css` — variabel CSS di `:root` (--bg #080808, --yellow #ffd21a, --orange #f36b21, dst)
- `assets/videos/*.mp4` — 8 video (kompres H.264, ~2-14MB)
- `assets/profile.png` — foto profil

Mekanisme portfolio saat ini: tiap project punya `link` (Drive, utk thumbnail) + `videoSource` (mp4 lokal, utk putar langsung di modal).

## Struktur baru (multi-page)
1. **index.html (Home)** — hero (status badge "Available for projects", nama besar, role, positioning statement, CTA View Work + Let's Talk, socials) · brand logos marquee · stats counters (5+ tahun, 40+ project) · expertise/services (4 disiplin bernomor) · portfolio terpilih (4-6 project) · career timeline (drag horizontal) · CTA kolaborasi
2. **portfolio.html** — grid semua project + filter kategori (All/AI Ads/UGC Style/Commercial/Event/Cinematic)
3. **portfolio/xxx.html** — halaman detail PER PROJECT (hero judul, video player, deskripsi, format/platform, tags, cerita singkat, tombol WhatsApp order) — generate untuk semua 8 project
4. **services.html** — 6 layanan detail + proses kerja (6 langkah)
5. **about.html** — cerita profesional engaging + career timeline + stats
6. **contact.html** — form order + kontak + socials + FAQ
7. Navbar konsisten semua halaman + **toggle bahasa ID/EN** + tombol CTA "Start a Project"

## Konten (ID — terjemahkan ke EN natural, JANGAN kaku)
Semua konten lama di `content.js` PERTAHANKAN & dipakai. Tambahan baru:

**Stats:** 5+ tahun pengalaman · 40+ project · 6 kategori layanan · 1+ tahun di Spencers Indonesia (pakai 3-4 angka yang paling kuat, jangan mengarang angka lain)

**Career timeline:**
- 2019–sekarang — GREAT VISINEMA — Freelance Videografer & Video Editor
- 2021–2022 — EIGHT PRODUCTION — Video Editor
- 2022–2024 — PT. Tristar Global Indonesia — Social Media Staff
- 2024–2025 — PT. Aksara Digital Creative — Videografer & Photografer
- 2025–sekarang — PT. SFS Group (Spencers Indonesia) — Creative Video

**About (ID):**
"Saya Dicky Christa Kurniawan — creative video specialist dari Surabaya. Perjalanan saya dimulai sebagai videografer freelance, memproduksi company profile, konten sosial media, dan video YouTube. Dari sana saya tumbuh melewati production house dan tim marketing brand, sampai sekarang fokus di Spencers Indonesia sebagai creative video.

Yang saya kerjakan: mengubah product insight menjadi short-form video ads yang siap dipakai untuk Meta Ads, Instagram Reels, dan YouTube Shorts — mulai dari riset angle, hook, script, hingga arahan visual dan editing. Saya percaya video ads yang bagus bukan cuma enak dilihat, tapi juga dibangun untuk performa: cepat menarik perhatian, mudah dipahami, dan mendorong aksi.

Di luar pekerjaan, saya aktif bereksperimen dengan AI video generation — karena cara orang membuat konten berubah cepat, dan saya ingin selalu berada di sisi depan perubahannya."

**Brand logos:** Spencers Indonesia, BurnX, Padel (logo text/marquee — pakai teks/logo yang tersedia; jika logo file tidak ada, buat versi teks yang elegan)

**Socials:** Instagram (instagram.com/dickynism), LinkedIn (linkedin.com/in/dicky-christa-kurniawan-11405a1ab), WhatsApp (wa.me/6282228009011), email (halo.dickynism@gmail.com)

**Order form (WAJIB di HTML statis, bukan JS render):** nama, email, no WhatsApp, jenis project (dropdown), estimasi budget (dropdown), ceritakan brief (textarea). Gunakan `<form name="order" method="POST" data-netlify="true" netlify>` — Netlify Forms butuh form terdeteksi di HTML saat build. Notifikasi ke halo.dickynism@gmail.com (atur action/attribute standar Netlify Forms).

## Guardrails (JANGAN dilanggar)
1. **JANGAN hapus/ubah** `assets/videos/*.mp4` dan mekanisme `videoSource` + thumbnail Drive di project
2. Form order harus **statis di HTML** (Netlify Forms tidak mendeteksi form render-JS)
3. Tetap **pure HTML/CSS/JS** — TANPA framework/build step (jangan Next.js/React/Vite)
4. Semua halaman **responsive** (mobile-first) & **ringan** (video jangan di-load sampai diputar)
5. **SEO**: tiap halaman punya title + meta description + OG tags
6. Bahasa toggle: ID default, EN penuh — semua konten (termasuk FAQ, services, about) diterjemahkan natural
7. Jaga struktur file rapi: satu folder `assets/`, halaman di root, file JS/CSS terpisah per kebutuhan
8. JANGAN commit/push — cukup ubah file di workspace. Saya yang review dulu.
9. Test lokal sebelum selesai: jalankan `python3 -m http.server` dan pastikan semua halaman render tanpa error console.

## Cara kerja
1. Baca seluruh file yang ada (`index.html`, `content.js`, `script.js`, `style.css`) untuk pahami pola
2. Implementasikan struktur baru sesuai di atas
3. Pertahankan identitas visual lama yang kuat (aksen kuning/oranye, gaya konten)
4. Selesai = semua halaman berfungsi, form kebaca Netlify, toggle bahasa jalan, video tetap muter

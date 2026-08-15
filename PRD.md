# PRD — dickynism.ink v2 (REDESIGN)

**Produk:** Website portfolio Dicky Christa Kurniawan — Creative Video Specialist
**Standar kualitas:** Premium editorial. Referensi rasa: pramudyadji.com (bukan menyalin). DILARANG hasil generic.
**Stack:** HTML + CSS + vanilla JS murni. TANPA framework. Netlify Forms. GitHub auto-deploy.

---

## 1. Prinsip Desain (WAJIB)
1. **Editorial premium, bukan template.** Banyak whitespace, hierarki tegas, ritme simetris.
2. **Maksimal 3 font family** (lihat Design System). DILARANG font acak/fallback aneh.
3. **DILARANG emoji & glyph dekoratif** (✦, ↗, →, ❌). Navigasi & CTA pakai teks polos. Satu-satunya simbol yang boleh: panah sederhana "→" pada link, hanya jika konsisten.
4. **Simetri & grid ketat.** Semua section sejajar ke grid yang sama. Tombol satu ukuran konsisten. Judul rata kiri, bukan tengah (kecuali ditentukan).
5. **Copy TIDAK BOLEH diubah** — semua copy sudah ditulis di PRD ini (ID & EN). Codex hanya menempatkan, tidak mengarang.

## 2. Design System (EKSKAT)

### Warna (CSS variables di :root)
```
--bg:          #0A0A0A   (latar utama)
--surface:     #141414   (kartu)
--surface-2:   #1C1C1C   (kartu hover/terang)
--border:      #2A2A2A
--text:        #F5F5F0
--text-muted:  #A8A8A0
--accent:      #FFD21A   (kuning — CTA & aksen)
--accent-ink:  #0A0A0A   (teks di atas kuning)
--status:      #22C55E   (titik hijau "available")
```
Aturan: aksen kuning HANYA untuk CTA primer, highlight kata kunci, dan elemen status. Jangan menabur kuning.

### Tipografi (Google Fonts — WAJIB load ketiganya)
| Peran | Font | Weight |
|---|---|---|
| Display (h1, h2, angka stat) | **Space Grotesk** | 500, 700 |
| Body, nav, tombol, form | **Inter** | 400, 500, 600 |
| Eyebrow, label, tahun, angka kecil | **JetBrains Mono** | 400, 600 |

Arah: **tech tapi elegan** — Space Grotesk memberi karakter modern-teknis, Inter menjaga keterbacaan elegan, mono pada label memberi sentuhan engineering. DILARANG font lain.

**Type scale (desktop → mobile):**
- Display h1: 80px → 44px, lh 0.95, ls -0.02em, weight 800
- Section h2: 48px → 32px, lh 1.05, weight 700
- h3 (kartu): 22px → 19px, weight 600
- Body: 17px → 16px, lh 1.65, weight 400
- Eyebrow/label: 12px, UPPERCASE, ls 0.14em, weight 600, warna muted
- Caption: 14px, muted
- Angka stat: 64px → 40px, weight 800, aksen kuning
DILARANG: weight di luar daftar, ukuran di luar skala, line-height sembarang.

### Spacing & Layout
- Base spacing: 8px (semua jarak kelipatan 8)
- Section padding: 128px vertikal (desktop), 64px (mobile)
- Container: max-width 1200px, padding horizontal 24px, centered
- Grid portfolio: **4 kolom desktop / 2 tablet / 1 mobile**, gap 16px, kartu ASPEK SAMA (aspect-ratio 4/5), thumbnail SERAGAM (1080×1350 cover) — KARTU HARUS KOMPAK, JANGAN gede-gede.
- Hero: konten rata kiri, max-width 640px
- Nav: fixed top, tinggi 72px, border-bottom 1px border

### Komponen
- **Tombol primer:** tinggi 48px, padding 0 28px, radius 8px, bg accent, teks accent-ink, weight 600, 15px. Hover: bg #FFE066. Semua tombol primer IDENTIK.
- **Tombol sekunder:** tinggi 48px, border 1px #3A3A3A, teks text. Hover: border text.
- **Kartu project:** surface, border 1px border, radius 12px, padding 20px, hover: border accent + translateY(-4px). Judul h3 + label kategori (eyebrow, muted).
- **Nav link:** 15px Inter, muted; active: text; hover: text.
- **Form field:** tinggi 48px, bg surface, border 1px border, radius 8px, fokus: border accent. Label eyebrow 12px uppercase.
- **Marquee brand:** teks 20px, ls 0.2em, weight 700, warna #3A3A3A (abu gelap — BUKAN putih mencolok), dipisah spasi lebar. Tanpa ikon/separator.
- **Timeline karier:** list vertikal simetris, tiap baris: tahun (muted, mono-lebar konsisten) + nama perusahaan (600) + peran (muted). Drag horizontal HANYA jika tetap rapi; default: grid 2 kolom.
- **Stat counter:** 4 kolom, angka besar kuning, label caption muted, rata tengah per kolom, dipisah border kiri 1px.

### Responsive breakpoints
- 1024px: grid 2 kolom · 768px: grid 1 kolom, nav jadi hamburger · 480px: type scale mobile

## 3. Copy (WAJIB PAKAI INI — ID & EN)

### Hero
- Eyebrow: "CREATIVE VIDEO SPECIALIST — SURABAYA"
- Badge: "TERSEDIA UNTUK PROYEK" + titik hijau (EN: "AVAILABLE FOR PROJECTS")
- H1 ID: "Video pendek yang bekerja. Bukan sekadar keren." (kata "bekerja" italic serif)
- H1 EN: "Short-form video that works. Not just looks good." ("works" italic)
- Deskripsi ID: "Saya Dicky Christa Kurniawan. Saya mengubah product insight menjadi video ads untuk Meta, Instagram Reels, dan YouTube Shorts — dari riset angle, hook, script, hingga editing."
- Deskripsi EN: "I'm Dicky Christa Kurniawan. I turn product insights into video ads for Meta, Instagram Reels, and YouTube Shorts — from angle research, hooks, and scripts to editing."
- CTA: "Lihat Karya" (primer) / "Hubungi Saya" (sekunder) · EN: "View Work" / "Contact Me"

### Stats (angka, tanpa emoji)
- 5+ / "Tahun pengalaman" (EN: "Years of experience")
- 40+ / "Proyek selesai" (EN: "Projects delivered")
- 6 / "Kategori layanan" (EN: "Service categories")
- 1+ / "Tahun di Spencers Indonesia" (EN: "Year at Spencers Indonesia")

### Expertise (4 item, bernomor 01-04)
1. Performance Video Ads — "Short-form ads berbasis audience insight dan objective campaign."
2. UGC & Social Creative — "Video natural dan relatable untuk Reels, Shorts, dan Meta Ads."
3. Creative Direction — "Storyboard, shot direction, dan creative brief siap produksi."
4. Editing & AI Video — "Editing presisi dengan dukungan AI video generation."
(EN diterjemahkan natural, satu kalimat per item.)

### About (halaman & ringkasan home)
ID: "Perjalanan saya dimulai sebagai videografer freelance — company profile, konten sosial media, video YouTube. Saya tumbuh melewati production house dan tim marketing brand, hingga kini fokus di Spencers Indonesia sebagai creative video. Saya percaya video ads yang baik dibangun untuk performa: cepat menarik perhatian, mudah dipahami, dan mendorong aksi. Di luar pekerjaan, saya terus bereksperimen dengan AI video generation."
(EN: terjemahan natural, tone sama. TIDAK BOLEH ditambah-tambah.)

### Career timeline (judul perusahaan + tahun + peran)
- 2019 — GREAT VISINEMA — Freelance Videografer & Video Editor
- 2021 — EIGHT PRODUCTION — Video Editor
- 2022 — PT. Tristar Global Indonesia — Social Media Staff
- 2024 — PT. Aksara Digital Creative — Videografer & Photografer
- 2025 — PT. SFS Group (Spencers Indonesia) — Creative Video
(EN: jabatan diterjemahkan.)

### Portfolio
- Label kategori: AI Ads / UGC Style / Commercial / Event / Cinematic
- Deskripsi project: GUNAKAN deskripsi yang sudah ada di content.js (sudah bagus) — terjemahkan EN natural. JANGAN ganti.
- Halaman detail: judul, kategori + platform (eyebrow), video player, satu paragraf cerita dari deskripsi existing, tombol "Order via WhatsApp" (sekunder).
- **Thumbnail:** dibuat dengan GPT Image (akun ChatGPT) — gaya KONSISTEN semua project: dark cinematic, tipografi tebal modern (judul project), subtitle uppercase kecil, aksen kuning #FFD21A, rasio 4:5 (1080×1350). File lokal `assets/thumbnails/[slug].jpg`. Prompt pack ada di `THUMBNAILS.md`.

### Contact
- H1 ID: "Ceritakan project Anda." (EN: "Tell me about your project.")
- Sub: "Belum punya brief lengkap? Gambaran produk dan goal sudah cukup." (EN natural)
- Form: NAMA / EMAIL / NO. WHATSAPP / JENIS PROJECT (dropdown 6 layanan) / ESTIMASI BUDGET (dropdown: Di bawah Rp2 juta · Rp2-5 juta · Rp5-10 juta · Di atas Rp10 juta · Perlu didiskusikan) / CERITAKAN BRIEF (textarea) / tombol "Kirim Brief"
- Kontak langsung: email halo.dickynism@gmail.com · WhatsApp · Instagram · LinkedIn

### FAQ (6 item — pakai yang sudah ada di content.js, ID + EN natural)
(Revisi 2x · durasi 3-5 hari · tools AI · bebas iklan berbayar · format 9:16/1:1/16:9 · alur kerjasama)

### Footer
- "DICKYNISM.INK" + Instagram + LinkedIn + WhatsApp + email. TANPA tagline tambahan.

## 4. Struktur Halaman
1. **index.html** — Hero → Marquee brand (SPENCERS INDONESIA · BURNX · PADEL) → Stats → Expertise (4) → Portfolio terpilih (6 project, grid) → Career timeline → CTA band ("Mari membuat sesuatu yang berarti." + tombol "Mulai Percakapan")
2. **portfolio.html** — header + filter kategori + grid semua 9 project
3. **portfolio/[slug].html** — 9 halaman detail (template konsisten)
4. **services.html** — 6 layanan (grid 3×2) + proses 6 langkah (dari content.js)
5. **about.html** — cerita + stats + timeline lengkap
6. **contact.html** — form + kontak langsung + FAQ
7. Navbar konsisten: Home / Portfolio / Services / About / Contact + tombol "Mulai Proyek" + toggle ID/EN (kiri-kanan konsisten)

## 5. Teknis & Guardrails
- Form order: STATIS di contact.html, `<form name="order" data-netlify="true" netlify>` + honeypot. DILARANG render-JS.
- Video: pertahankan assets/videos/*.mp4 + videoSource + fallback Drive. `preload="none"`.
- SEO: tiap halaman title + meta description + OG. 
- Toggle bahasa: content.js object `translations` (id/en), default dari `lang` atribut / localStorage.
- Performance: font display=swap, video lazy, tanpa library eksternal.
- Test lokal WAJIB: `python3 -m http.server` + cek semua halaman tanpa error console.

## 6. Acceptance Criteria (harus lolos semua)
1. Tidak ada emoji/glyph dekoratif di seluruh halaman.
2. Tepat 3 font family (Archivo, Instrument Serif, Inter) — tidak ada font lain.
3. Semua jarak kelipatan 8; section sejajar grid; tombol identik.
4. Copy 100% sesuai PRD (ID & EN) — tidak ada teks karangan baru.
5. Type scale sesuai tabel; heading rata kiri; tidak ada ukuran aneh.
6. Semua 6 halaman + 9 detail render tanpa error console.
7. Toggle ID/EN bekerja di semua halaman, konsisten.
8. Form Netlify terdeteksi (data-netlify) & semua field required.
9. Video lokal & fallback Drive berfungsi.
10. Responsive: grid collapse benar di 1024/768/480.

## 7. Out of Scope (v2)
- Blog, store, sistem booking kalender, testimoni (menunggu data asli), halaman landing campaign.

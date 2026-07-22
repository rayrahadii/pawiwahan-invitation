# Undangan Pernikahan — Tema Bali (React + Vite + TypeScript)

Template undangan pernikahan digital bernuansa Bali: palet hitam/abu-abu
gelap dipadu emas & kuning, motif ukiran (patra) sebagai elemen berulang,
siluet gapura (candi bentar) di beberapa section, dan tekstur batu di
latar belakang beberapa bagian. Smooth scrolling pakai Lenis, animasi
scroll-reveal pakai Framer Motion.

## Menjalankan tanpa Docker

```bash
npm install
npm run dev
```

Buka `http://localhost:5173`.

## Menjalankan dengan Docker (dev saja)

Dockerfile ini **khusus untuk development** — menjalankan `vite dev` dengan
hot reload, bukan build produksi.

```bash
docker compose up --build
```

atau tanpa compose:

```bash
docker build -t undangan-bali-dev .
docker run -p 5173:5173 -v "$(pwd)":/app -v /app/node_modules undangan-bali-dev
```

Lalu buka `http://localhost:5173`. Perubahan file di komputer kamu akan
langsung ter-reload di browser (HMR). Polling file-watcher hanya aktif
otomatis saat dijalankan lewat Docker (lihat `vite.config.ts`) supaya
tidak memicu refresh terus-menerus saat dijalankan langsung di host.

> Volume `-v /app/node_modules` sengaja dipisah supaya `node_modules` hasil
> `npm install` di dalam container (Linux) tidak ketimpa oleh folder
> `node_modules` di host kamu.

## Struktur yang perlu kamu edit

| Yang mau diubah | File |
|---|---|
| Nama, tanggal, lokasi acara, kisah cinta, rekening, dll. | `src/data/invitation.ts` |
| Foto galeri & foto mempelai | `public/images/gallery-*.jpg`, `public/images/portrait-placeholder.jpg` |
| Tekstur latar (dipakai di beberapa section) | `public/images/texture-stone.jpg` |
| Musik latar | `public/audio/song.mp3` (lalu update `music.src` di `invitation.ts` bila nama file beda) |
| Warna, tipografi, & tekstur | CSS variables di `src/index.css` (bagian `:root`) |
| Motif ukiran / siluet gapura | `src/components/BalineseOrnament.tsx`, `src/components/GapuraSilhouette.tsx`, `src/components/CarvedCorners.tsx` |
| Urutan/section | `src/App.tsx` |

Semua gambar galeri & tekstur saat ini adalah **placeholder** yang
digenerate otomatis (lihat `scripts/gen_placeholders.py`) dengan palet
warna yang sama supaya tidak ada gambar rusak saat pertama kali
dijalankan — tinggal timpa file dengan nama yang sama di `public/images/`
dengan foto asli.

## Elemen khas tema ini

- **`BalineseOrnament`** — motif ukiran/patra emas yang "tergambar" sendiri
  saat discroll, dipakai sebagai pembatas antar section (mirip ukiran kayu Bali).
- **`GapuraSilhouette`** — siluet gapura/candi bentar (gerbang belah) yang
  jadi latar di section Cover, Hero, dan Closing — dua menara simetris
  dengan celah di tengah, khas arsitektur pura Bali.
- **`CarvedCorners`** — ornamen sudut kecil ala bingkai ukiran, dipasang di
  kartu profil mempelai, kartu acara, dan kartu rekening (lewat class
  utility `.carved-frame`).
- **`.section--textured`** — class tambahan yang menumpuk tekstur batu
  gelap di belakang beberapa section (Hero, Acara, Kado, Closing) supaya
  ada variasi kedalaman, bukan cuma warna flat.

## Tautan personal per tamu

Nama tamu di layar pembuka diambil dari parameter URL, contoh:

```
https://domainmu.com/?to=Budi+Santoso
```

Kalau parameter tidak ada, akan tampil "Tamu Undangan".

## Catatan tentang RSVP & buku ucapan

Form RSVP dan "Ucapan & Doa" saat ini menyimpan data ke `localStorage`
browser masing-masing pengunjung (jadi hanya tersimpan di perangkat
pengunjung tersebut, tidak terkirim ke mana-mana). Ini cukup untuk demo/
preview. Untuk pemakaian nyata di acara sungguhan, sambungkan
`saveRsvp()` di `src/components/RSVP.tsx` dan `persistWishes()` di
`src/components/Wishes.tsx` ke backend kamu sendiri (API sederhana,
Firebase, Supabase, atau Google Sheets via Apps Script) supaya semua
respons tamu terkumpul di satu tempat.

## Catatan tentang kutipan pembuka

Kutipan di section "Quote" sengaja ditulis generik (tidak merujuk ke kitab
suci tertentu) supaya template ini bisa dipakai lintas keyakinan. Ganti
`quote.lead` / `quote.body` / `quote.source` di `src/data/invitation.ts`
dengan ayat, petuah, atau kata-kata pilihan kalian sendiri.

## Build produksi (opsional)

```bash
npm run build
```

Hasil build statis ada di folder `dist/` — bisa di-hosting di Vercel,
Netlify, Cloudflare Pages, atau static hosting apa pun. (Dockerfile di
proyek ini sengaja hanya untuk dev; kalau butuh image produksi, tambahkan
tahap `nginx`/`serve` terpisah.)

import type { InvitationData } from "../types";

/**
 * ============================================================
 *  SEMUA KONTEN UNDANGAN ADA DI SINI.
 *  Ini adalah DATA CONTOH (placeholder) — ganti semua nilai di
 *  bawah dengan data mempelai yang sebenarnya. Tidak perlu
 *  menyentuh file komponen lain untuk mengubah isi undangan.
 * ============================================================
 */
export const invitationData: InvitationData = {
  brideNickname: "Kadek",
  groomNickname: "Wira",
  brideFullName: "Ni Kadek Ayu Larasati",
  groomFullName: "I Made Wira Kusuma",
  brideParents: "Putri dari Bapak I Wayan Suarta & Ibu Ni Nyoman Sari",
  groomParents: "Putra dari Bapak I Ketut Darmawan & Ibu Ni Made Yuliani",
  brideInstagram: "https://instagram.com/",
  groomInstagram: "https://instagram.com/",

  // Tanggal target untuk hitung mundur (format ISO, sesuaikan zona waktu)
  targetDate: "2026-11-14T08:00:00+08:00",
  weddingDateLabel: "Sabtu, 14 November 2026",

  // Kutipan generik (tidak merujuk ke kitab suci tertentu) supaya bisa
  // dipakai lintas keyakinan — ganti dengan ayat/petuah pilihanmu bila perlu.
  quote: {
    lead:
      "Seperti akar pohon beringin yang saling menjalin di bawah tanah, begitu pula cinta yang tulus mengikat dua hati menjadi satu.",
    body:
      "Dengan penuh syukur, kami mengundang Bapak/Ibu/Saudara/i untuk turut hadir dan memberikan doa restu bagi perjalanan baru kami.",
    source: "",
  },

  events: [
    {
      id: "akad",
      title: "Upacara Pawiwahan",
      dateLabel: "Sabtu, 14 November 2026",
      timeLabel: "08:00 – 10:00 WITA",
      venueName: "Kediaman Mempelai Wanita",
      venueAddress: "Jl. Kenanga No. 8, Ubud, Gianyar, Bali",
      mapsUrl: "https://maps.google.com",
      isoDate: "20261114T000000Z",
      isoDateEnd: "20261114T020000Z",
    },
    {
      id: "resepsi",
      title: "Resepsi",
      dateLabel: "Sabtu, 14 November 2026",
      timeLabel: "11.00 – 14.00 WITA",
      venueName: "The Kayon Garden, Ubud",
      venueAddress: "Jl. Raya Sayan, Ubud, Gianyar, Bali",
      mapsUrl: "https://maps.google.com",
      isoDate: "20261114T030000Z",
      isoDateEnd: "20261114T060000Z",
    },
  ],

  loveStory: [
    {
      id: "story-1",
      year: "2018",
      title: "Pertemuan Pertama",
      description:
        "Kami pertama kali bertemu saat acara komunitas di Denpasar. Percakapan singkat itu ternyata jadi awal dari kisah yang panjang.",
    },
    {
      id: "story-2",
      year: "2021",
      title: "Menjalin Hubungan",
      description:
        "Setelah beberapa tahun saling mengenal, kami memutuskan untuk melangkah bersama dengan lebih serius.",
    },
    {
      id: "story-3",
      year: "2025",
      title: "Lamaran",
      description:
        "Kedua keluarga besar bertemu dan memberikan restu bagi hubungan kami untuk melangkah ke jenjang berikutnya.",
    },
    {
      id: "story-4",
      year: "2026",
      title: "Hari Bahagia",
      description:
        "Dengan penuh syukur, kami akan melangsungkan pernikahan dan memohon doa restu dari seluruh keluarga serta sahabat.",
    },
  ],

  gallery: [
    { id: "g1", src: "/images/gallery-1.jpg", alt: "Momen kebersamaan 1" },
    { id: "g2", src: "/images/gallery-2.jpg", alt: "Momen kebersamaan 2" },
    { id: "g3", src: "/images/gallery-3.jpg", alt: "Momen kebersamaan 3" },
    { id: "g4", src: "/images/gallery-4.jpg", alt: "Momen kebersamaan 4" },
    { id: "g5", src: "/images/gallery-5.jpg", alt: "Momen kebersamaan 5" },
    { id: "g6", src: "/images/gallery-6.jpg", alt: "Momen kebersamaan 6" },
  ],

  bankAccounts: [
    {
      id: "bank-1",
      bankName: "Bank BCA",
      accountName: "Ni Kadek Ayu Larasati",
      accountNumber: "1234567890",
    },
    {
      id: "bank-2",
      bankName: "Bank Mandiri",
      accountName: "I Made Wira Kusuma",
      accountNumber: "0987654321",
    },
  ],

  giftRegistryUrl: "",

  music: {
    title: "Instrumental Pernikahan",
    src: "/audio/song.mp3",
  },
};

export default function manifest() {
  return {
    name: "Roster & Anggaran Gaji",
    short_name: "Roster Syif",
    description: "Aplikasi Roster Shift dan Anggaran Gaji",
    start_url: "/",
    display: "standalone",
    background_color: "#0f172a",
    theme_color: "#0f172a",
    icons: [
      {
        src: "192.jpg",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/512.jpg",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
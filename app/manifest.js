export default function manifest() {
  return {
    name: "Silka - Inexis",
    short_name: "Silka",
    description: "Sistem Informasi Layanan Kepegawaian Terintegrasi.",
    display_override: ["fullscreen", "minimal-ui"],
    prefer_related_applications: false,
    start_url: "/?utm_source=homescreen",
    scope: "/",
    id: "/",
    display: "standalone",
    background_color: "#ffffff",
    orientation: "portrait-primary",
    lang: "id-ID",
    theme_color: "#0b57cf",
    serviceworker: {
      src: "/sw.js",
    },
    icons: [
      {
        src: "/favicon/web-app-manifest-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/favicon/web-app-manifest-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    shortcuts: [
      {
        name: "Homepage - Silka",
        short_name: "Homepage",
        description: "Sistem Informasi Layanan Kepegawaian Terintegrasi.",
        url: "/",
        icons: [
          {
            src: "/favicon/web-app-manifest-192x192.png",
            sizes: "192x192",
            type: "image/png",
            density: "4.0",
          },
        ],
      },
      {
        name: "Loginpage - Silka",
        short_name: "Loginpage",
        description:
          "Masukan username dan password kepegawaian untuk masuk aplikasi",
        url: "/auth",
        icons: [
          {
            src: "/favicon/web-app-manifest-192x192.png",
            sizes: "192x192",
            type: "image/png",
            density: "4.0",
          },
        ],
      },
    ],
    screenshots: [
      {
        src: "/screenshoot/homepage.png",
        type: "image/png",
        sizes: "1419x2796",
        platform: "ios",
        form_factor: "narrow",
        label: "Halaman Utama - Aplikasi silka-inexis",
      },
      {
        src: "/screenshoot/loginpage.png",
        type: "image/png",
        sizes: "1419x2796",
        platform: "ios",
        form_factor: "narrow",
        label: "Halaman Login - Aplikasi silka-inexis",
      },
      {
        src: "/screenshoot/dekstop-homepage.png",
        type: "image/png",
        sizes: "3220x2100",
        platform: "mac",
        form_factor: "wide",
        label: "Halaman Login - Aplikasi silka-inexis",
      },
      {
        src: "/screenshoot/dekstop-loginpage.png",
        type: "image/png",
        sizes: "3220x2100",
        platform: "mac",
        form_factor: "wide",
        label: "Halaman Login - Aplikasi silka-inexis",
      },
    ],
  };
}

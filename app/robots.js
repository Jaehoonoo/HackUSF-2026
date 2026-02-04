export default function robots() {
  const baseUrl = "https://hackusf.com"; // Replace with your actual domain

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin/",
          "/api/",
          "/sign-in/",
          "/sign-up/",
          "/profile",
          "/application",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

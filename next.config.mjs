/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // Canonical speakers path (PR #4 mock lived at /speakers)
      {
        source: "/speakers",
        destination: "/our-speakers",
        permanent: true,
      },
      // Legacy PHP soft-landing paths from themotivationcompany.co.za
      {
        source: "/motivation_company-our_speakers.php",
        destination: "/our-speakers",
        permanent: true,
      },
      {
        source: "/motivation_company-gallery.php",
        destination: "/gallery",
        permanent: true,
      },
      {
        source: "/motivation_company-services.php",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/motivation_company-training.php",
        destination: "/training",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

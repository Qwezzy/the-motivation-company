/** @type {import('next').NextConfig} */
const nextConfig = {
  // Private brochure is read from disk by the API route; include it in the serverless bundle.
  experimental: {
    outputFileTracingIncludes: {
      "/api/team-building": ["./private/brochure/**/*"],
    },
  },
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

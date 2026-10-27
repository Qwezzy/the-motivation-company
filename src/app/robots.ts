import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Legacy PHP leftovers still on the server (shadowed / redirected).
        disallow: ["/cgi-bin/", "/includes/", "/ver_img/", "/colorbox/", "/jcaption/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}

// Single source of truth for a page's title + share metadata. React 19 hoists
// <title>/<meta>/<link> to <head> from anywhere they're rendered, and the
// prerender step captures them into each route's static HTML — so drop <Seo/>
// into any page (or future guide) and it gets a correct title, description,
// canonical, and Open Graph / Twitter card with no hand-copied meta block.

const SITE_IMAGE = "https://speedrun.watch/og-image.png";

interface SeoProps {
  title: string;
  description: string;
  url: string; // absolute canonical URL
  image?: string; // absolute URL of the share card; defaults to the site image
  imageWidth?: number;
  imageHeight?: number;
  type?: "website" | "article";
}

const Seo = ({
  title,
  description,
  url,
  image = SITE_IMAGE,
  imageWidth = 1200,
  imageHeight = 686,
  type = "website",
}: SeoProps) => (
  <>
    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={url} />
    <meta property="og:type" content={type} />
    <meta property="og:url" content={url} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={image} />
    <meta property="og:image:width" content={String(imageWidth)} />
    <meta property="og:image:height" content={String(imageHeight)} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:url" content={url} />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={image} />
  </>
);

export default Seo;

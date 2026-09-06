// Structured data for a guide page: TechArticle + BreadcrumbList + FAQPage in
// one JSON-LD graph, so search engines understand it and it's eligible for
// richer results. Drop <GuideJsonLd .../> into any guide — future guides get
// consistent, correct markup for free.

interface FaqItem {
  q: string;
  a: string;
}
interface GuideJsonLdProps {
  headline: string;
  description: string;
  url: string; // absolute URL of the guide
  breadcrumbName: string; // the guide's name in the breadcrumb trail
  faq: FaqItem[];
}

const GuideJsonLd = ({ headline, description, url, breadcrumbName, faq }: GuideJsonLdProps) => {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        headline,
        description,
        url,
        author: { "@type": "Organization", name: "speedrun.watch" },
        publisher: { "@type": "Organization", name: "speedrun.watch" },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://speedrun.watch/" },
          { "@type": "ListItem", position: 2, name: "Guides", item: "https://speedrun.watch/guides" },
          { "@type": "ListItem", position: 3, name: breadcrumbName, item: url },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: faq.map(({ q, a }) => ({
          "@type": "Question",
          name: q,
          acceptedAnswer: { "@type": "Answer", text: a },
        })),
      },
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
};

export default GuideJsonLd;

import {
  EMAIL,
  GITHUB,
  LINKEDIN,
  TWITTER,
  WHATSAPP,
} from "@/data/contact";

export default function StructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Siddartho Sarker Bipro",
    url: "https://siddartho.vercel.app",
    email: EMAIL,
    jobTitle: "Software Engineer",
    sameAs: [GITHUB, LINKEDIN, TWITTER, WHATSAPP],
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

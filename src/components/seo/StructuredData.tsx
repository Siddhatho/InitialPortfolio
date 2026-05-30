export default function StructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Siddartho Sarker Bipro",
    url: "https://siddartho.vercel.app",
    jobTitle: "Software Engineer",
    sameAs: [
      "https://github.com/placeholder",
      "https://linkedin.com/in/placeholder",
    ],
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

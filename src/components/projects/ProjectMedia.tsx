"use client";

import { useState } from "react";

import Image from "next/image";

type ProjectMediaProps = {
  src: string;
  alt: string;
  featured?: boolean;
  priority?: boolean;
};

export default function ProjectMedia({
  src,
  alt,
  featured = false,
  priority = false,
}: ProjectMediaProps) {
  const [failed, setFailed] = useState(false);

  return (
    <div
      className={`pc__media${featured ? " pc__media--featured" : ""}`}
      aria-hidden={failed}
    >
      {failed ? (
        <div className="pc__placeholder" role="img" aria-label={alt} />
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          className="pc__img"
          sizes={
            featured
              ? "(max-width: 768px) 100vw, 60vw"
              : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          }
          priority={priority}
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}

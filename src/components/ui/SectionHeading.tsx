import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
};

export default function SectionHeading({
  title,
  subtitle,
  align = "left",
}: SectionHeadingProps) {
  const isCenter = align === "center";

  return (
    <div className={cn(isCenter ? "text-center" : "text-left")}>
      <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-text">
        {title}
      </h2>
      <div className={cn("mt-3 h-0.5 w-12 bg-brand-blue", isCenter && "mx-auto")} />
      {subtitle ? (
        <p className={cn("text-brand-muted mt-3 max-w-xl", isCenter && "mx-auto")}>
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

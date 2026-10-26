interface SectionHeaderProps {
  subtitle?: string;
  title: string;
  gradientTitle?: string;
  description?: string;
  align?: "center" | "left";
  className?: string;
}

export default function SectionHeader({
  subtitle,
  title,
  gradientTitle,
  description,
  align = "center",
  className = "",
}: SectionHeaderProps) {
  const isCenter = align === "center";

  return (
    <div
      className={`mb-12 md:mb-16 ${isCenter ? "text-center max-w-3xl mx-auto" : "max-w-2xl"} ${className}`}
    >
      {subtitle && (
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-brand-blue/10 text-brand-blue border border-brand-blue/20 mb-4">
          {subtitle}
        </div>
      )}
      <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-tight mb-4">
        {title}{" "}
        {gradientTitle && <span className="gradient-text">{gradientTitle}</span>}
      </h2>
      {description && (
        <p className="text-muted text-base sm:text-lg leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}

import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={cn("space-y-3", className)}>
      <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">{title}</h2>
      {description ? (
        <p className="max-w-2xl text-sm text-foreground/70 md:text-base">{description}</p>
      ) : null}
    </div>
  );
}

import { cn } from "@/lib/utils";

const blocks = Array.from({ length: 8 }).map((_, index) => index);

export function LookbookGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {blocks.map((block) => (
        <div
          key={block}
          className={cn(
            "aspect-4/5 rounded-3xl border border-foreground/5 bg-linear-to-br",
            block % 2 === 0
              ? "from-[#f4efe7] via-white to-[#f1e6d6]"
              : "from-[#efe5da] via-white to-[#f7f4ef]"
          )}
        />
      ))}
    </div>
  );
}

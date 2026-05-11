export function ProductCardSkeleton() {
  return (
    <div className="animate-pulse rounded-3xl border border-foreground/5 bg-card p-4">
      <div className="mb-4 aspect-4/5 w-full rounded-2xl bg-foreground/5" />
      <div className="space-y-3">
        <div className="h-3 w-2/3 rounded-full bg-foreground/10" />
        <div className="h-3 w-1/3 rounded-full bg-foreground/10" />
        <div className="h-10 w-full rounded-full bg-foreground/10" />
      </div>
    </div>
  );
}

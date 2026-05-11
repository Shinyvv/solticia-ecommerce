import * as React from "react";
import { cn } from "@/lib/utils";

export type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;

export function Label({ className, ...props }: LabelProps) {
  return (
    <label
      className={cn("text-xs uppercase tracking-[0.2em] text-muted-foreground", className)}
      {...props}
    />
  );
}

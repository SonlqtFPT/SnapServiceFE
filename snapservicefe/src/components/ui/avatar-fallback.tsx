// src/components/ui/avatar-fallback.tsx
import * as React from "react";

const AvatarFallback = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    className={
      "flex h-full w-full items-center justify-center rounded-full bg-muted " + className
    }
    {...props}
  />
));
AvatarFallback.displayName = "AvatarFallback";

export { AvatarFallback };
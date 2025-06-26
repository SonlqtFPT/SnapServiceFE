// src/components/ui/avatar.tsx
"use client";

import * as React from "react";

const Avatar = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    className={
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full " + className
    }
    {...props}
  />
));
Avatar.displayName = "Avatar";

export { Avatar };
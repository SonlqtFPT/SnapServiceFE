// src/components/ui/tabs-list.tsx
"use client";

import * as React from "react";
import { useTabsContext } from "./tabs"; // Import từ file tabs.tsx bạn vừa tạo

const TabsList = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={
      "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground " + className
    }
    role="tablist"
    {...props}
  />
));
TabsList.displayName = "TabsList";

export { TabsList };
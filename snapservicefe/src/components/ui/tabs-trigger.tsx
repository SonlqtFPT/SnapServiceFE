// src/components/ui/tabs-trigger.tsx
"use client";

import * as React from "react";
import { useTabsContext } from "./tabs"; // Import từ file tabs.tsx bạn vừa tạo

interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ className, value, onClick, ...props }, ref) => {
    const { value: activeValue, onValueChange } = useTabsContext();
    const isActive = activeValue === value;

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      onValueChange(value);
      onClick?.(event);
    };

    return (
      <button
        ref={ref}
        className={
          `inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50
          ${isActive ? "bg-background text-foreground shadow-sm" : "data-[state=inactive]:hover:bg-muted"}
          ${className}`
        }
        data-state={isActive ? "active" : "inactive"}
        onClick={handleClick}
        role="tab"
        aria-selected={isActive}
        aria-controls={`radix-:R1a:-content-${value}`} // Cần khớp với ID của TabsContent
        id={`radix-:R1a:-trigger-${value}`} // Cần khớp với ID của TabsContent
        {...props}
      />
    );
  }
);
TabsTrigger.displayName = "TabsTrigger";

export { TabsTrigger };
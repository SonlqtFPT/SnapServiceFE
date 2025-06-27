// src/components/ui/tabs-content.tsx
"use client";

import * as React from "react";
import { useTabsContext } from "./tabs"; // Import từ file tabs.tsx bạn vừa tạo

interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
  ({ className, value, children, ...props }, ref) => {
    const { value: activeValue } = useTabsContext();
    const isActive = activeValue === value;

    if (!isActive) {
      return null; // Chỉ render nội dung khi tab active
    }

    return (
      <div
        ref={ref}
        className={"mt-2 " + className}
        data-state={isActive ? "active" : "inactive"}
        role="tabpanel"
        aria-labelledby={`radix-:R1a:-trigger-${value}`} // Cần khớp với ID của TabsTrigger
        id={`radix-:R1a:-content-${value}`} // Cần khớp với ID của TabsTrigger
        {...props}
      >
        {children}
      </div>
    );
  }
);
TabsContent.displayName = "TabsContent";

export { TabsContent };
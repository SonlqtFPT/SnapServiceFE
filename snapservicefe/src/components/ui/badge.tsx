// src/components/ui/badge.tsx
import * as React from "react";

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline";
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => {
    const baseStyle = "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";
    let variantStyle = "";

    switch (variant) {
      case "default":
        variantStyle = "border-transparent bg-primary text-primary-foreground hover:bg-primary/80";
        break;
      case "secondary":
        variantStyle = "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80";
        break;
      case "destructive":
        variantStyle = "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80";
        break;
      case "outline":
        variantStyle = "text-foreground";
        break;
    }

    return (
      <div
        ref={ref}
        className={`${baseStyle} ${variantStyle} ${className}`}
        {...props}
      />
    );
  }
);
Badge.displayName = "Badge";

export { Badge };
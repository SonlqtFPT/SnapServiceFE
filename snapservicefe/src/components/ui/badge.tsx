import * as React from "react";

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline" | "success" | "danger" | "warning";
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => {
    const baseStyle =
      "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";

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
      case "success":
        variantStyle = "border-transparent bg-green-100 text-green-800 hover:bg-green-200";
        break;
      case "danger":
        variantStyle = "border-transparent bg-red-100 text-red-800 hover:bg-red-200";
        break;
      case "warning":
        variantStyle = "border-transparent bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
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

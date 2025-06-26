// src/components/ui/switch.tsx
"use client";

import * as React from "react";

// Đây là một phiên bản đơn giản của Switch.
// Để có đầy đủ tính năng và khả năng truy cập, bạn có thể cần một thư viện headless UI như Radix UI.

interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, checked, onCheckedChange, ...props }, ref) => {
    const isControlled = checked !== undefined;
    const [internalChecked, setInternalChecked] = React.useState(checked || false);

    const currentChecked = isControlled ? checked : internalChecked;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newChecked = event.target.checked;
      if (!isControlled) {
        setInternalChecked(newChecked);
      }
      onCheckedChange?.(newChecked);
    };

    return (
      <label
        className={
          "relative inline-flex h-[24px] w-[44px] cursor-pointer items-center rounded-full transition-colors " + className
        }
      >
        <input
          type="checkbox"
          className="peer sr-only" // sr-only để ẩn input gốc
          checked={currentChecked}
          onChange={handleChange}
          ref={ref}
          {...props}
        />
        <div
          className={`
            w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300
            dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full
            peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px]
            after:bg-white after:border after:border-gray-300 after:rounded-full after:h-5 after:w-5
            after:transition-all dark:border-gray-600
            ${currentChecked ? "bg-blue-600" : ""}
          `}
        ></div>
        <span className="ml-3 text-sm font-medium text-gray-900 sr-only">Toggle Switch</span>
      </label>
    );
  }
);
Switch.displayName = "Switch";

export { Switch };
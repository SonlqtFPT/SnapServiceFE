// src/components/ui/switch.tsx
"use client";

import * as React from "react";

interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ className = "", checked, onCheckedChange, ...props }, ref) => {
    const isControlled = checked !== undefined;
    const [internalChecked, setInternalChecked] = React.useState(!!checked);

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
        className={`relative inline-flex h-6 w-11 items-center cursor-pointer ${className}`}
      >
        <input
          type="checkbox"
          className="peer sr-only"
          checked={currentChecked}
          onChange={handleChange}
          ref={ref}
          {...props}
        />
        <div
          className={`
            w-11 h-6
            rounded-full
            bg-gray-200 dark:bg-gray-700
            peer-checked:bg-blue-600
            transition-colors
            relative
            peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800
            after:content-[''] after:absolute after:top-[2px] after:left-[2px]
            after:bg-white after:border after:border-gray-300 after:rounded-full
            after:h-5 after:w-5 after:transition-transform after:duration-200
            peer-checked:after:translate-x-full peer-checked:after:border-white
            dark:border-gray-600
          `}
        />
        <span className="sr-only">Toggle Switch</span>
      </label>
    );
  }
);

Switch.displayName = "Switch";
export { Switch };

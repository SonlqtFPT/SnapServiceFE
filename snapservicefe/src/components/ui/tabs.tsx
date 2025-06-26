// src/components/ui/tabs.tsx
"use client";

import * as React from "react";

interface TabsContextType {
  value: string;
  onValueChange: (value: string) => void;
}

const TabsContext = React.createContext<TabsContextType | undefined>(undefined);

interface TabsProps {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  children: React.ReactNode;
}

const Tabs = ({ defaultValue, value, onValueChange, className, children }: TabsProps) => {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = React.useState(defaultValue || "");

  const currentValue = isControlled ? value : internalValue;

  const handleValueChange = (newValue: string) => {
    if (!isControlled) {
      setInternalValue(newValue);
    }
    onValueChange?.(newValue);
  };

  const contextValue = React.useMemo(() => ({
    value: currentValue,
    onValueChange: handleValueChange,
  }), [currentValue, handleValueChange]);

  return (
    <TabsContext.Provider value={contextValue}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
};

// Hook để sử dụng context
const useTabsContext = () => {
  const context = React.useContext(TabsContext);
  if (context === undefined) {
    throw new Error("useTabsContext must be used within a Tabs component");
  }
  return context;
};

export { Tabs, useTabsContext };
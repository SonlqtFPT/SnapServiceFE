"use client";

import { useEffect, useRef } from "react";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import dayjs from "dayjs";

export default function DateFilterBar({
  selectedDate,
  setSelectedDate,
  rangeDays,
  setRangeDays,
  tab,
  setTab,
}: {
  selectedDate: string;
  setSelectedDate: (val: string) => void;
  rangeDays: number;
  setRangeDays: (val: 1 | 30) => void;
  tab: "orders" | "users";
  setTab: (val: "orders" | "users") => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!inputRef.current) return;

    flatpickr(inputRef.current, {
      defaultDate: selectedDate,
      dateFormat: "d/m/Y",
      onChange: (selectedDates) => {
        if (selectedDates.length > 0) {
          const iso = dayjs(selectedDates[0]).format("YYYY-MM-DD");
          setSelectedDate(iso);
        }
      },
    });
  }, [inputRef]);

  return (
    <div className="flex flex-wrap gap-3 items-end">
      {/* Start date */}
      <div>
        <label className="block text-xs font-medium text-muted-foreground mb-1">
          Select start date
        </label>
        <input
          ref={inputRef}
          defaultValue={dayjs(selectedDate).format("DD/MM/YYYY")}
          className="border rounded px-2 py-1 text-sm bg-background shadow-sm w-[150px]"
        />
      </div>

      {/* Range */}
      <div>
        <label className="block text-xs font-medium text-muted-foreground mb-1">
          Range
        </label>
        <select
          value={rangeDays}
          onChange={(e) => setRangeDays(Number(e.target.value) as 1 | 30)}
          className="border rounded px-2 py-1 text-sm bg-background shadow-sm"
        >
          <option value={1}>1 day</option>
          <option value={30}>30 days</option>
        </select>
      </div>

      {/* Tab select */}
      <div className="ml-auto flex gap-2">
        <button
          onClick={() => setTab("orders")}
          className={`px-4 py-1.5 rounded-md text-sm font-medium ${
            tab === "orders"
              ? "bg-background shadow text-foreground"
              : "bg-muted text-muted-foreground"
          }`}
        >
          Orders
        </button>
        <button
          onClick={() => setTab("users")}
          className={`px-4 py-1.5 rounded-md text-sm font-medium ${
            tab === "users"
              ? "bg-background shadow text-foreground"
              : "bg-muted text-muted-foreground"
          }`}
        >
          Users
        </button>
      </div>
    </div>
  );
}

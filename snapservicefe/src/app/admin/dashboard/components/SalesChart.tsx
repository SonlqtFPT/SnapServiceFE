import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export type SalesData = {
  label: string;
  value: number;
};

export default function SalesChart({
  title,
  data,
  xLabel,
  yLabel,
  barColor = "bg-blue-500",
  unit = "",
}: {
  title: string;
  data: SalesData[];
  xLabel: string;
  yLabel: string;
  barColor?: string;
  unit?: string;
}) {
  const maxValue = Math.max(...data.map((item) => item.value));
  const scaleFactor = maxValue > 0 ? 100 / maxValue : 0;

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64 flex items-end justify-around gap-2 p-4 border-b border-l border-gray-200">
          {data.map((item, index) => (
            <div key={index} className="flex flex-col items-center justify-end h-full">
              {/* Always show the label */}
              <span className="text-xs text-gray-700 mb-1">
                {item.value.toLocaleString()}
              </span>

              {/* Ensure even zero values render with a visible bar */}
              <div
                className={`w-8 ${barColor} rounded-t-md transition-all duration-300 ease-out`}
                style={{
                  height: `${item.value * scaleFactor}%`,
                  minHeight: item.value > 0 ? '0' : '4px', // fallback height for zero values
                  opacity: item.value > 0 ? 1 : 0.3, // visually distinguish zeros if desired
                }}
                title={`${item.label}: ${item.value.toLocaleString()}${unit}`}
              ></div>

              <span className="text-xs text-gray-600 mt-1">{item.label}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span>{yLabel}</span>
          <span>{xLabel}</span>
        </div>
      </CardContent>
    </Card>
  );
}

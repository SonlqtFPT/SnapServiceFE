import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight } from "lucide-react";

type SummaryItem = {
  id: number;
  title: string;
  value: string;
  change: string;
  icon: React.ElementType;
  trend: "up" | "down" | "none";
};

export default function SummaryCards({ data }: { data: SummaryItem[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {data.map((item) => (
        <Card key={item.id}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
            <item.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{item.value}</div>
            <p className="text-xs text-muted-foreground flex items-center">
              {item.trend === "up" && (
                <ArrowUpRight className="h-3 w-3 mr-1 text-green-500" />
              )}
              {item.change}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

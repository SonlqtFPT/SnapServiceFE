export default function StatCard({
  icon: Icon,
  title,
  value,
  subtitle,
}: {
  icon: React.ElementType;
  title: string;
  value: number | string;
  subtitle: string;
}) {
  return (
    <div className="border rounded-lg p-4 bg-background shadow-sm flex flex-col gap-1">
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>{title}</span>
        <Icon className="h-4 w-4" />
      </div>
      <div className="text-2xl font-bold mt-2">{value}</div>
      <p className="text-xs text-muted-foreground">{subtitle}</p>
    </div>
  );
}

import { DataEntry } from "@/hooks/use-checkout-data";

export default function convertToChartData(data: any): DataEntry[] {
  const result: DataEntry[] = Object.entries(data).map(([hour, guests]) => ({
    hour,
    guests: Number(guests),
  }));
  return result;
}

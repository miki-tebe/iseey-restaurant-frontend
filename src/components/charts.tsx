"use client";

import { useState } from "react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useDataStore from "@/hooks/use-checkout-data";
import { getChartData } from "@/app/actions";
import { toast } from "sonner";
import { useSubscribePlan } from "@/hooks/use-subscribe-plan";
import convertToChartData from "@/lib/convertToChartData";

export default function GuestActivityChart() {
  const { graphData, date, setDate, setData } = useDataStore();
  const { setLoading } = useSubscribePlan();
  const [viewType, setViewType] = useState("daily");

  const handlePrevDate = () => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() - 1);
    setDate(newDate);
  };

  const handleNextDate = () => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + 1);
    setDate(newDate > new Date() ? date : newDate);
  };

  const handleChange = async (value: string) => {
    setViewType(value);
    setLoading(true);
    try {
      const res = await getChartData(value === "daily" ? "hours" : value, date);
      const convertResponse = convertToChartData(res);
      setData(convertResponse);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (graphData.length <= 0) return;
  return (
    <Card className="w-full bg-[#1c1c1c] text-white">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={handlePrevDate}
              className="bg-[#2a2a2a] text-white border-gray-600 hover:bg-[#3a3a3a]"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="font-medium text-white">
              {date.toLocaleDateString("en-US", {
                month: "2-digit",
                day: "2-digit",
                year: "numeric",
              })}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={handleNextDate}
              disabled={date.toDateString() === new Date().toDateString()}
              className="bg-[#2a2a2a] text-white border-gray-600 hover:bg-[#3a3a3a]"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <Select
            value={viewType}
            onValueChange={(value: string) => handleChange(value)}
          >
            <SelectTrigger className="w-[100px] bg-[#2a2a2a] text-white border-gray-600">
              <SelectValue placeholder="View" />
            </SelectTrigger>
            <SelectContent className="bg-[#2a2a2a] text-white border-gray-600">
              <SelectItem value="daily" className="hover:bg-[#3a3a3a]">
                Daily
              </SelectItem>
              <SelectItem value="weekly" className="hover:bg-[#3a3a3a]">
                Weekly
              </SelectItem>
              <SelectItem value="monthly" className="hover:bg-[#3a3a3a]">
                Monthly
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={graphData}>
            <XAxis
              dataKey="hour"
              stroke="#cccccc"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#cccccc"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
            />
            <Bar dataKey="guests" fill="#2563eb" radius={[4, 4, 0, 0]} />
            <Tooltip
              cursor={{ fill: "rgba(255, 255, 255, 0.1)" }}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-[#2a2a2a] border border-gray-600 rounded p-2 shadow-md text-white">
                      <p className="text-sm">{`Active guests: ${payload[0].value}`}</p>
                    </div>
                  );
                }
                return null;
              }}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

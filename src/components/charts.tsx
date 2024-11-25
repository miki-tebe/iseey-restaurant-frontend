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

export default function GuestActivityChart() {
  const { data } = useDataStore();
  const [date, setDate] = useState(new Date("2024-11-25"));
  const [viewType, setViewType] = useState("daily");

  const handlePrevDate = () => {
    setDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(newDate.getDate() - 1);
      return newDate;
    });
  };

  const handleNextDate = () => {
    setDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(newDate.getDate() + 1);
      return newDate > new Date() ? prevDate : newDate;
    });
  };

  return (
    <Card className="w-full bg-[#1c1c1c] text-white">
      <CardHeader>
        {/* <CardTitle>Dashboard</CardTitle>
        <div className="text-sm font-medium">Active guests: 0</div> */}
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
          <Select value={viewType} onValueChange={setViewType}>
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
          <BarChart data={data}>
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

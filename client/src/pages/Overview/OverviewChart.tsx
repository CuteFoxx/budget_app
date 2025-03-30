import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useSelector } from "react-redux";
import { RootState } from "@/state/Store";
import { ChartData } from "@/types/ChartData";

const chartConfig = {
  expense: {
    label: "Expense",
    color: "hsl(var(--chart-1))",
  },
  income: {
    label: "Income",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

function OverviewChart() {
  const date = new Date();
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  const expenses = useSelector((state: RootState) => state.expenses.items);
  const incomes = useSelector((state: RootState) => state.incomes.items);
  let totalExpenses = 0;
  let totalIncomes = 0;
  const currentMonthExpenses = expenses.filter(
    (item) =>
      item.date != null &&
      new Date(item.date) < lastDay &&
      new Date(item.date) > firstDay
  );
  const currentMonthIncomes = incomes.filter(
    (item) =>
      item.date != null &&
      new Date(item.date) < lastDay &&
      new Date(item.date) > firstDay
  );

  const distinctDaysCurrentMonth = new Set(
    [...currentMonthExpenses, ...currentMonthIncomes].map((item) =>
      new Date(item.date).getDate()
    )
  );

  let arr = new Array<ChartData>();

  distinctDaysCurrentMonth.forEach((value) => {
    const day = value;
    let currentDay = {} as ChartData;

    currentDay.day = day;
    currentDay.expenses = 0;
    currentDay.incomes = 0;

    currentMonthExpenses.forEach((expense) => {
      if (day == new Date(expense.date).getDate())
        currentDay.expenses += expense.amount ?? 0;
    });

    currentMonthIncomes.forEach((income) => {
      if (day == new Date(income.date).getDate())
        currentDay.incomes += income.amount ?? 0;
    });

    arr.push(currentDay);
  });

  arr = arr.sort((a, b) => a.day - b.day);

  arr.forEach((item) => {
    totalExpenses += item.expenses;
    totalIncomes += item.incomes;
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Incomes and Expenses this month</CardTitle>
        <CardDescription>incomes this month: {totalIncomes}</CardDescription>
        <CardDescription>expenses this month: {totalExpenses}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          className="max-h-[50vh] md:max-h-[15vh] relative w-full"
          config={chartConfig}
        >
          <LineChart
            accessibilityLayer
            data={arr}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="expenses"
              type="monotone"
              stroke="var(--expense)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="incomes"
              type="monotone"
              stroke="var( --income)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export default OverviewChart;

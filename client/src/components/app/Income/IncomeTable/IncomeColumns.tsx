import { Expense } from "@/types/Expense";
import { ColumnDef } from "@tanstack/react-table";
import { EllipsisVertical } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/state/Store";
import { customFetch } from "@/utils/customFetch";
import { FormDialog } from "@/components/ui/FormDialog";
import { Income } from "@/types/Income";
import { addIncomes } from "@/state/IncomeSlice";
import EditIncomeFormWrapper from "../EditIncomeFormWrapper";

export const IncomeColumns: ColumnDef<Income>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorFn: (row) => row?.incomeCategory?.name ?? "",
    header: "Category",
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      const userSettings = useSelector(
        (state: RootState) => state.settings.items
      );
      const dateRaw: Date = row.getValue("date");
      const date = new Date(dateRaw);

      if (dateRaw == null) {
        return "";
      }

      return <>{date?.toLocaleDateString(userSettings.language ?? "en-US")}</>;
    },
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const userSettings = useSelector(
        (state: RootState) => state.settings.items
      );

      let formatted;
      const amount = parseFloat(row.getValue("amount"));
      if (userSettings.currency != null && userSettings.language != null) {
        formatted = new Intl.NumberFormat(userSettings.language, {
          style: "currency",
          currency: userSettings.currency,
        }).format(amount);
      } else {
        formatted = amount;
      }

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const dispatch = useDispatch();
      const incomes = useSelector((state: RootState) => state.incomes.items);
      const income = row.original;

      return (
        <div className="text-right">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <EllipsisVertical />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel className="!text-left">
                Actions
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                asChild
                // onSelect={(e) => {
                //   e.preventDefault();
                // }}
              >
                <FormDialog
                  triggerButton={
                    <Button
                      variant="ghost"
                      className="w-full justify-start pl-2"
                    >
                      Edit
                    </Button>
                  }
                  title="Edit Income"
                >
                  <EditIncomeFormWrapper
                    defaultValues={{
                      name: income.name,
                      amount: income.amount,
                      category: income?.incomeCategory?.name ?? "",
                      date: income.date,
                    }}
                    id={income.id}
                  />
                </FormDialog>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-red-500"
                onClick={() => {
                  customFetch("incomes", { id: income.id }, "DELETE");
                  dispatch(
                    addIncomes(incomes.filter((item) => item.id != income.id))
                  );
                }}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];

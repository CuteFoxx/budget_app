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
import { deleteData } from "@/utils/deleteData";
import { useDispatch, useSelector } from "react-redux";
import { addExpenses } from "@/state/ExpenseSlice";
import { RootState } from "@/state/Store";

export const ExpenseColumns: ColumnDef<Expense>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "expenseCategory.name",
    header: "Category",
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const userSettings = useSelector(
        (state: RootState) => state.settings.items
      );

      if (userSettings.currency != null) {
        const amount = parseFloat(row.getValue("amount"));
        const formatted = new Intl.NumberFormat(userSettings.language, {
          style: "currency",
          currency: userSettings.currency,
        }).format(amount);

        return <div className="text-right font-medium">{formatted}</div>;
      }
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const dispatch = useDispatch();
      const expenses = useSelector((state: RootState) => state.expenses.items);
      const expense = row.original;

      return (
        <div className="text-right">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <EllipsisVertical />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-red-500"
                onClick={() => {
                  deleteData("expenses/delete", { id: expense.id });
                  dispatch(
                    addExpenses(
                      expenses.filter((item) => item.id != expense.id)
                    )
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

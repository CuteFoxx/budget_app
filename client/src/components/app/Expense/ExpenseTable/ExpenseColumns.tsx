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
import { addExpenses } from "@/state/ExpenseSlice";
import { RootState } from "@/state/Store";
import { customFetch } from "@/utils/customFetch";
import { FormDialog } from "@/components/ui/FormDialog";
import EditExpenseFormWrapper from "../EditExpenseFormWrapper";
import MakeRepeatingForm from "../MakeRepeatingExpenseForm";
import { useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { addSelectedExpenses } from "@/state/SelectedItemsSlice";

export const ExpenseColumns: ColumnDef<Expense>[] = [
  {
    id: "select",
    header: ({ table }) => {
      const expenses = useSelector((state: RootState) => state.expenses.items);
      const dispatch = useDispatch();
      const selected = table.getSelectedRowModel().rows;
      useEffect(() => {
        let items = selected.map((item) => item.original);
        dispatch(addSelectedExpenses(items));
      }, [selected]);

      useEffect(() => {
        table.toggleAllPageRowsSelected(false);
      }, [expenses]);

      return (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => {
            return table.toggleAllPageRowsSelected(!!value);
          }}
          aria-label="Select all"
        />
      );
    },
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorFn: (row) => row?.expenseCategory?.name ?? "",
    header: "Category",
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      const userSettings = useSelector(
        (state: RootState) => state.settings.items
      );
      const dateRaw: Date = row?.getValue("date");
      const date = new Date(dateRaw);

      if (dateRaw == null) {
        return "";
      }

      return <>{date?.toLocaleDateString(userSettings?.language ?? "en-US")}</>;
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
      const amount = parseFloat(row?.getValue("amount"));
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
      const expenses = useSelector((state: RootState) => state.expenses.items);
      const expense = row?.original;

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
              <DropdownMenuItem asChild>
                <FormDialog
                  triggerButton={
                    <Button
                      variant="ghost"
                      className="w-full justify-start pl-2"
                    >
                      Edit
                    </Button>
                  }
                  title="Edit Expense"
                >
                  <EditExpenseFormWrapper
                    defaultValues={{
                      name: expense.name,
                      amount: expense.amount,
                      category: expense?.expenseCategory?.name ?? "",
                      date: expense.date,
                    }}
                    id={expense.id}
                  />
                </FormDialog>
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={(e) => {
                  e.preventDefault();
                }}
              >
                <FormDialog
                  triggerButton={
                    <Button variant="ghost" className="w-full p-0 -ml-1">
                      Make repeating
                    </Button>
                  }
                  title="Make repeating"
                >
                  <MakeRepeatingForm expense={expense} />
                </FormDialog>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-red-500"
                onClick={() => {
                  customFetch("expenses", { id: expense.id }, "DELETE");
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

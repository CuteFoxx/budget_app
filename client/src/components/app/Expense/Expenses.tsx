import { Plus } from "lucide-react";
import Card from "../../authentication-forms/Card";
import { FormDialog } from "../../ui/FormDialog";
import AddExpenseForm from "./AddExpenseFormWrapper";
import { useEffect, useState } from "react";
import { API_URL } from "@/config";
import { Expense } from "@/types/Expense";
import ExpenseComponent from "./Expense";
import {
  Table,
  TableCell,
  TableHeader,
  TableRow,
  TableBody,
} from "@/components/ui/table";
import useFetch from "@/hooks/UseFetch";
import Loader from "../../ui/Loader";
import { useDispatch, useSelector } from "react-redux";
import { addExpenses } from "@/state/ExpenseSlice";
import type { RootState } from "@/state/Store";
import { categoryName } from "@/types/CategoryName";
import { addCategories } from "@/state/CategorySlice";
import { ExpenseColumns } from "./ExpenseTable/ExpenseColumns";
import { DataTable } from "@/components/ui/dataTable";

function Expenses() {
  const expenses = useSelector((state: RootState) => state.expenses.items);
  const dispatch = useDispatch();

  const { data, isLoading } = useFetch<Expense[]>({
    url: `${API_URL}/expenses`,
  });
  const { data: categories } = useFetch<categoryName[]>({
    url: `${API_URL}/expenses/categories`,
  });

  useEffect(() => {
    if (data != null) {
      dispatch(addExpenses(data));
    }
  }, [data]);

  useEffect(() => {
    if (categories != null) {
      dispatch(addCategories(categories));
    }
  }, [categories]);

  return (
    <Card className="relative overflow-hidden">
      <Loader isLoading={isLoading} />
      {expenses && (
        <>
          <div className="card-heading">
            <h2>Expenses</h2>

            <FormDialog
              buttonText={
                <>
                  Add <Plus />
                </>
              }
              title="Add Expense"
            >
              <AddExpenseForm />
            </FormDialog>
          </div>
          <DataTable columns={ExpenseColumns} data={expenses} />
        </>
      )}
    </Card>
  );
}

export default Expenses;

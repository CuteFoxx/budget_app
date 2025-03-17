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

function Expenses() {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const { data, isLoading } = useFetch<Expense[]>({
    url: `${API_URL}/expenses`,
  });

  const buttonInner = (
    <>
      Add <Plus />
    </>
  );

  useEffect(() => {
    if (data != null) {
      setExpenses(data);
    }
  });

  return (
    <Card className="relative overflow-hidden">
      <Loader isLoading={isLoading} />
      {expenses && (
        <>
          <div className="card-heading">
            <h2>Expenses</h2>

            <FormDialog buttonText={buttonInner} title="Add Expense">
              <AddExpenseForm />
            </FormDialog>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Category</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {expenses != null &&
                expenses.length > 0 &&
                expenses?.map((expense: Expense) => (
                  <ExpenseComponent key={expense.id} expense={expense} />
                ))}
            </TableBody>
          </Table>
        </>
      )}
    </Card>
  );
}

export default Expenses;

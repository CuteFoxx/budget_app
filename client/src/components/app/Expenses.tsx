import { Plus } from "lucide-react";
import Card from "../authentication-forms/Card";
import { FormDialog } from "../ui/FormDialog";
import AddExpenseForm from "./AddExpenseForm";
import { useSelector } from "react-redux";
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
import Loader from "../ui/loader";

function Expenses() {
  // TODO REMOVE ANY
  const token = useSelector((state: any) => state.token.token);
  const refreshToken = useSelector((state: any) => state.token.refreshToken);
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const { data, isLoading } = useFetch<{
    expenses: Expense[];
  }>({
    url: `${API_URL}/expenses`,
    tokens: { token, refreshToken },
  });

  const buttonInner = (
    <>
      Add <Plus />
    </>
  );

  useEffect(() => {
    if (data != null) {
      setExpenses(data?.expenses);
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
              {expenses?.map((expense: Expense) => (
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

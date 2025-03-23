import { Plus } from "lucide-react";
import Card from "../../authentication-forms/Card";
import { FormDialog } from "../../ui/FormDialog";
import AddExpenseForm from "./AddExpenseFormWrapper";
import Loader from "../../ui/Loader";
import { useSelector } from "react-redux";
import type { RootState } from "@/state/Store";
import { ExpenseColumns } from "./ExpenseTable/ExpenseColumns";
import { DataTable } from "@/components/ui/dataTable";

function Expenses() {
  const expenses = useSelector((state: RootState) => state.expenses.items);

  return (
    <Card className="relative overflow-hidden">
      <Loader isLoading={expenses == null} />
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

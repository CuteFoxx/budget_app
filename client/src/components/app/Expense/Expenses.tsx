import { Plus } from "lucide-react";
import Card from "../../authentication-forms/Card";
import { FormDialog } from "../../ui/FormDialog";
import AddExpenseForm from "./AddExpenseFormWrapper";
import Loader from "../../ui/Loader";
import { useSelector } from "react-redux";
import type { RootState } from "@/state/Store";
import { ExpenseColumns } from "./ExpenseTable/ExpenseColumns";
import { DataTable } from "@/components/ui/dataTable";
import { Button } from "@/components/ui/button";
import DeleteSelected from "./DeleteSelectedExpenses";

function Expenses() {
  const selectedExpenses = useSelector(
    (state: RootState) => state.selected.expenses
  );
  const selectedIds = selectedExpenses?.map((item) => item.id);
  const expenses = useSelector((state: RootState) => state.expenses.items);

  return (
    <Card className="relative overflow-hidden">
      <Loader isLoading={expenses == null} />
      {expenses && (
        <>
          <div className="card-heading">
            <h2>Expenses</h2>
            <div className="flex items-center gap-2">
              {selectedExpenses.length > 0 ? (
                <DeleteSelected ids={selectedIds} />
              ) : (
                ""
              )}
              <FormDialog
                triggerButton={
                  <Button>
                    Add <Plus />
                  </Button>
                }
                title="Add Expense"
              >
                <AddExpenseForm />
              </FormDialog>
            </div>
          </div>
          <DataTable columns={ExpenseColumns} data={expenses} />
        </>
      )}
    </Card>
  );
}

export default Expenses;

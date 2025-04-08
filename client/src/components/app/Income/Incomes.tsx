import { Plus } from "lucide-react";
import Card from "../../authentication-forms/Card";
import { FormDialog } from "../../ui/FormDialog";
import { Button } from "@/components/ui/button";
import AddIncomeFormWrapper from "./AddIncomeFormWrapper";
import { DataTable } from "@/components/ui/dataTable";
import { useSelector } from "react-redux";
import { RootState } from "@/state/Store";
import { IncomeColumns } from "./IncomeTable/IncomeColumns";
import { Income } from "@/types/Income";
import DeleteSelected from "./DeleteSelectedIncomes";

function Incomes() {
  const incomes = useSelector((state: RootState) => state.incomes.items);
  const selectedIncomes = useSelector(
    (state: RootState) => state.selected.incomes
  );
  const selectedIds = selectedIncomes?.map((item) => item.id);
  return (
    <div className="relative">
      <Card>
        <div className="card-heading">
          <h2>Incomes</h2>
          <div className="flex items-center gap-2">
            {selectedIncomes.length > 0 ? (
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
              title="Add Income"
            >
              <AddIncomeFormWrapper />
            </FormDialog>
          </div>
        </div>
        <DataTable<Income, Income> columns={IncomeColumns} data={incomes} />
      </Card>
    </div>
  );
}

export default Incomes;

import { Plus } from "lucide-react";
import Card from "../../authentication-forms/Card";
import { FormDialog } from "../../ui/FormDialog";
import { Button } from "@/components/ui/button";
import AddIncomeFormWrapper from "./AddIncomeFormWrapper";

function Incomes() {
  return (
    <section>
      <Card>
        <div className="card-heading">
          <h2>Incomes</h2>
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
      </Card>
    </section>
  );
}

export default Incomes;

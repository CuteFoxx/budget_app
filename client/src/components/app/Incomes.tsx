import { Plus } from "lucide-react";
import Card from "../authentication-forms/Card";
import { FormDialog } from "../ui/FormDialog";

function Incomes() {
  const buttonInner = (
    <>
      Add <Plus />
    </>
  );

  return (
    <section>
      <Card>
        <div className="card-heading">
          <h2>Incomes</h2>
          <FormDialog buttonText={buttonInner} title="Add Income">
            test
          </FormDialog>
        </div>
      </Card>
    </section>
  );
}

export default Incomes;

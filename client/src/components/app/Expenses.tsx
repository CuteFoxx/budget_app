import { Plus } from "lucide-react";
import Card from "../authentication-forms/Card";
import { FormDialog } from "../ui/FormDialog";
import AddExpenseForm from "./AddExpenseForm";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { API_URL } from "@/config";

function Expenses() {
  // TODO REMOVE ANY
  const token = useSelector((state: any) => state.token.token);
  const [expenses, setExpenses] = useState<any>([]);

  const buttonInner = (
    <>
      Add <Plus />
    </>
  );

  useEffect(() => {
    fetch(`${API_URL}/expenses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const parsed = JSON.parse(data);
        setExpenses(parsed.expenses);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  console.log(expenses.expenses);

  return (
    <section>
      <Card>
        <div className="flex items-center justify-between">
          <h2>Expenses</h2>

          <FormDialog buttonText={buttonInner} title="Add Expense">
            <AddExpenseForm />
          </FormDialog>
        </div>
        <div>
          {expenses.map((expense) => {
            console.log(expense.id);
            return (
              <>
                <h3>{expense.name}</h3>
                <p>{expense.amount}</p>
              </>
            );
          })}
        </div>
      </Card>
    </section>
  );
}

export default Expenses;

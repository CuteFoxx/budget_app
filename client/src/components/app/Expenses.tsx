import { Plus } from "lucide-react";
import Card from "../authentication-forms/Card";
import { FormDialog } from "../ui/FormDialog";
import AddExpenseForm from "./AddExpenseForm";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { API_URL } from "@/config";
import { n } from "node_modules/react-router/dist/development/fog-of-war-Da8gpnoZ.d.mts";

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
        console.log(parsed.expenses);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <section>
      <Card>
        <div className="card-heading">
          <h2>Expenses</h2>

          <FormDialog buttonText={buttonInner} title="Add Expense">
            <AddExpenseForm />
          </FormDialog>
        </div>
        <div>
          {expenses.map((expense) => {
            if (expenses.expenseCategory?.expenseCategory !== null) {
              console.log(expense.name, expense?.expenseCategory?.name);
            }
            return (
              <div key={expense.id} className="flex justify-between">
                <h3>{expense.name}</h3>
                <div>{expense.amount}</div>
                <div>{expense?.expenseCategory?.name}</div>
              </div>
            );
          })}
        </div>
      </Card>
    </section>
  );
}

export default Expenses;

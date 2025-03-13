import { Plus } from "lucide-react";
import Card from "../authentication-forms/Card";
import { FormDialog } from "../ui/FormDialog";
import AddExpenseForm from "./AddExpenseForm";
import { useDispatch, useSelector } from "react-redux";
import { use, useEffect, useState } from "react";
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
import refreshTokenFunction from "@/utils/refreshToken";
import { setRefreshToken, setToken } from "@/state/TokenSlice";
import { useNavigate } from "react-router";

function Expenses() {
  // TODO REMOVE ANY
  const token = useSelector((state: any) => state.token.token);
  const refreshToken = useSelector((state: any) => state.token.refreshToken);
  const [expenses, setExpenses] = useState<Expense[]>();
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      .then((response) => {
        switch (response.status) {
          case 200:
            return response.json();
          case 401:
            const {
              token,
              refreshToken: refreshT,
              isAuthenticated,
            } = refreshTokenFunction({
              refresh_token: refreshToken,
            });
            if (!isAuthenticated) {
              localStorage.removeItem("token");
              localStorage.removeItem("refreshToken");
              dispatch(setToken(""));
              dispatch(setRefreshToken(""));
              navigate("/login");
              return;
            }
            localStorage.setItem("token", token);
            localStorage.setItem("refreshToken", refreshT);
            dispatch(setToken(token));
            dispatch(setRefreshToken(refreshT));

            break;
        }
      })
      .then((data) => {
        const parsed = JSON.parse(data);
        setExpenses(parsed.expenses as Expense[]);
      })
      .catch((error) => {});
  }, []);

  return (
    <>
      {expenses && (
        <section>
          <Card>
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
                {expenses.map((expense: Expense) => (
                  <ExpenseComponent key={expense.id} expense={expense} />
                ))}
              </TableBody>
            </Table>
          </Card>
        </section>
      )}
    </>
  );
}

export default Expenses;

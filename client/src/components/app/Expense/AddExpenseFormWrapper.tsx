import { expenseFormSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import AddExpenseForm from "./AddExpenseForm";
import { toast } from "sonner";
import { RootState } from "@/state/Store";
import { useDispatch, useSelector } from "react-redux";
import { addExpenses, addCategories } from "@/state/ExpenseSlice";
import { customFetch } from "@/utils/customFetch";

export default function AddExpenseFormWrapper() {
  const expenses = useSelector((state: RootState) => state.expenses.items);
  const categories = useSelector(
    (state: RootState) => state.expenses.categories
  );
  const dispatch = useDispatch();
  const [pending, setPending] = useState(false);

  const form = useForm<z.infer<typeof expenseFormSchema>>({
    resolver: zodResolver(expenseFormSchema),
    defaultValues: {
      name: "",
      amount: 0,
      category: "",
      date: new Date(Date.now()),
    },
  });

  function onSubmit(values: z.infer<typeof expenseFormSchema>) {
    setPending(true);

    customFetch("expenses", { ...values, date: values.date.getTime() })
      .then((res) => {
        if (res.ok || res.status === 200) {
          setPending(false);
          toast(`Expense: "${values.name}" has been added`, {
            description: `Amount: ${values.amount}, Category: ${values.category}`,
          });
        } else {
          toast.error(`Error`, {
            description: `status: ${res.status}, message: ${res.statusText}`,
          });
        }

        return res.json();
      })
      .then((data) => {
        if (typeof data === "string") {
          data = JSON.parse(data);
        }

        dispatch(
          addExpenses(
            [...expenses, data].sort(
              (a, b) =>
                new Date(b.date).setHours(0, 0, 0, 0) -
                new Date(a.date).setHours(0, 0, 0, 0)
            )
          )
        );
      });
  }

  const createCategory = (name: string) => {
    customFetch("expenses/categories", { name })
      .then((res) => {
        if (res.ok || res.status === 200) {
          toast(`Category: "${name}" has been created`);
        } else {
          toast.error(`Error`, {
            description: `status: ${res.status}, message: ${res.statusText}`,
          });
        }

        return res.json();
      })
      .then((data) => {
        if (typeof data === "string") {
          data = JSON.parse(data);
        }
        dispatch(addCategories([data, ...categories]));
      });
  };

  return (
    <AddExpenseForm
      categories={categories}
      form={form}
      onSubmit={onSubmit}
      pending={pending}
      noCategoryFound={createCategory}
    />
  );
}

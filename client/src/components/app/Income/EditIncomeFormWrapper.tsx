import { expenseFormSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { toast } from "sonner";
import { RootState } from "@/state/Store";
import { useDispatch, useSelector } from "react-redux";
import { addCategories } from "@/state/ExpenseSlice";
import { customFetch } from "@/utils/customFetch";
import AddIncomeForm from "./AddIncomeForm";
import { addIncomes } from "@/state/IncomeSlice";

export default function EditIncomeFormWrapper({
  defaultValues,
  id,
}: {
  defaultValues: z.infer<typeof expenseFormSchema>;
  id: number;
}) {
  const incomes = useSelector((state: RootState) => state.incomes.items);
  const categories = useSelector(
    (state: RootState) => state.incomes.categories
  );

  const dispatch = useDispatch();
  const [pending, setPending] = useState(false);

  const form = useForm<z.infer<typeof expenseFormSchema>>({
    resolver: zodResolver(expenseFormSchema),
    defaultValues: {
      name: defaultValues.name,
      amount: defaultValues.amount,
      category: defaultValues.category,
      date: defaultValues.date,
    },
  });

  function onSubmit(values: z.infer<typeof expenseFormSchema>) {
    setPending(true);

    customFetch(
      "incomes",
      { id: id, ...values, date: values.date.getTime() },
      "PUT"
    )
      .then((res) => {
        if (res.ok || res.status === 200) {
          setPending(false);
          toast(`Income: "${values.name}" has been updated`);
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
          addIncomes(
            [data ?? [], ...incomes.filter((i) => i.id != id)].sort(
              (a, b) =>
                new Date(b.date).setHours(0, 0, 0, 0) -
                new Date(a.date).setHours(0, 0, 0, 0)
            )
          )
        );
      });
  }

  const createCategory = (name: string) => {
    customFetch("incomes/categories", { name })
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
    <AddIncomeForm
      categories={categories}
      form={form}
      onSubmit={onSubmit}
      pending={pending}
      noCategoryFound={createCategory}
    />
  );
}

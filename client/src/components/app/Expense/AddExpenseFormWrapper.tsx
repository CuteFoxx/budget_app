import { API_URL } from "@/config";
import useFetch from "@/hooks/UseFetch";
import { expenseFormSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { categoryName } from "@/types/CategoryName";
import { postData } from "@/utils/postData";
import { useState } from "react";
import AddExpenseForm from "./AddExpenseForm";
import { toast, Toaster } from "sonner";
import { useTheme } from "@/components/ui/ThemeProvider";
import { cn } from "@/lib/utils";

export default function AddExpenseFormWrapper() {
  const theme = useTheme();
  const [pending, setPending] = useState(false);
  const { data: categories, isLoading } = useFetch<categoryName[]>({
    url: `${API_URL}/expenses/categories`,
  });
  const form = useForm<z.infer<typeof expenseFormSchema>>({
    resolver: zodResolver(expenseFormSchema),
    defaultValues: {
      name: "",
      amount: 0,
    },
  });

  function onSubmit(values: z.infer<typeof expenseFormSchema>) {
    setPending(true);

    postData("expenses/create", values).then((res) => {
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
    });
  }

  return (
    <AddExpenseForm
      categories={categories}
      form={form}
      onSubmit={onSubmit}
      pending={pending}
    />
  );
}

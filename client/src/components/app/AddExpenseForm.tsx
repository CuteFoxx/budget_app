import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { API_URL } from "@/config";
import useFetch from "@/hooks/UseFetch";
import { expenseFormSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Combobox } from "../ui/combobox";
import { categoryName } from "@/types/CategoryName";

export default function AddExpenseForm() {
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
    console.log(values);
    console.log("asdasd");

    fetch(`${API_URL}/expenses/create`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    }).then((res) => {
      console.log(res);
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Expense name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input type="numeric" placeholder="100.00" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <Combobox
              data={categories}
              title="Category"
              onChange={field.onChange}
            />
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

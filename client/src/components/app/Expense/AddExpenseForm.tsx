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
import { Combobox } from "../../ui/combobox";
import { UseFormReturn } from "react-hook-form";
import { expenseFormSchema } from "@/schema";
import { categoryName } from "@/types/CategoryName";
import { z } from "zod";
import { LoaderCircle } from "lucide-react";

type AddExpenseFormProps = {
  categories: categoryName[] | undefined;
  form: UseFormReturn<z.infer<typeof expenseFormSchema>>;
  onSubmit: (values: z.infer<typeof expenseFormSchema>) => void;
  pending: boolean;
};

function AddExpenseForm({
  categories,
  form,
  onSubmit,
  pending,
}: AddExpenseFormProps) {
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
        <Button type="submit" disabled={pending}>
          {pending ? <LoaderCircle className="animate-spin" /> : "Submit"}
        </Button>
      </form>
    </Form>
  );
}

export default AddExpenseForm;

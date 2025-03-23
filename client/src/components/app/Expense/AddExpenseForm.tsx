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
import { ExpenseCombobox } from "./ExpenseCombobox";
import { UseFormReturn } from "react-hook-form";
import { expenseFormSchema } from "@/schema";
import { categoryName } from "@/types/CategoryName";
import { z } from "zod";
import { LoaderCircle } from "lucide-react";
import { DatePicker } from "@/components/ui/datepciker";

type AddExpenseFormProps = {
  categories: categoryName[] | undefined;
  form: UseFormReturn<z.infer<typeof expenseFormSchema>>;
  onSubmit: (values: z.infer<typeof expenseFormSchema>) => void;
  noCategoryFound: (arg: string) => void;
  pending: boolean;
};

function AddExpenseForm({
  categories,
  form,
  onSubmit,
  pending,
  noCategoryFound,
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
                <Input
                  type="numeric"
                  placeholder="100.00"
                  {...field}
                  onFocus={(e) => {
                    if (
                      +parseFloat(e.target.value) == 0 ||
                      e.target.value.trim() == ""
                    ) {
                      e.target.value = "";
                    }
                  }}
                  onBlur={(e) => {
                    console.log(e.target.value);

                    if (
                      +parseFloat(e.target.value) == 0 ||
                      e.target.value.trim() == ""
                    ) {
                      e.target.value = "0";
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <ExpenseCombobox
              data={categories}
              title="Category"
              noResultsFound={noCategoryFound}
              field={field}
            />
          )}
        />
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date:</FormLabel>
              <DatePicker field={field} />
              <FormMessage />
            </FormItem>
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

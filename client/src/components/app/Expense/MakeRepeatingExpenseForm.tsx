import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm, UseFormReturn } from "react-hook-form";
import { expenseFormSchema, makeRepeatingFormSchema } from "@/schema";
import { z } from "zod";
import { LoaderCircle } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { MultiSelect } from "../DayMultiSelect";
import { useState } from "react";
import { customFetch } from "@/utils/customFetch";
import { toast } from "sonner";
import { Expense } from "@/types/Expense";

function MakeRepeatingExpenseForm({ expense }: { expense: Expense }) {
  const [pending, setPending] = useState(false);
  const form = useForm<z.infer<typeof makeRepeatingFormSchema>>({
    resolver: zodResolver(makeRepeatingFormSchema),
    defaultValues: {
      days: [],
    },
  });

  function onSubmit(values: z.infer<typeof makeRepeatingFormSchema>) {
    setPending(true);

    customFetch("task", {
      days: values.days,
      payload: JSON.stringify(expense),
      type: "expense",
    })
      .then((res) => {
        if (res.ok || res.status === 200) {
          setPending(false);
          toast("Created repeating task");
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
      });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="days"
          render={({ field }) => <MultiSelect field={field} />}
        />
        <Button type="submit" disabled={pending}>
          {pending ? <LoaderCircle className="animate-spin" /> : "Submit"}
        </Button>
      </form>
    </Form>
  );
}

export default MakeRepeatingExpenseForm;

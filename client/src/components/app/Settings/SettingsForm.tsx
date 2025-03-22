import { settingsFormSchema } from "@/schema";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import SettingsCurrency from "./SettingsCurrency";
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";

type SettingsFormProps = {
  form: UseFormReturn<z.infer<typeof settingsFormSchema>>;
  onSubmit: (values: z.infer<typeof settingsFormSchema>) => void;
};

function SettingsForm({ form, onSubmit }: SettingsFormProps) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="currency"
          render={({ field }) => (
            <>
              <FormLabel className=" block mb-2">Currency:</FormLabel>
              <FormItem>
                <SettingsCurrency field={field} />
              </FormItem>
            </>
          )}
        ></FormField>
      </form>
    </Form>
  );
}

export default SettingsForm;

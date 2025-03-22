import { useForm } from "react-hook-form";
import SettingsForm from "./SettingsForm";
import { z } from "zod";
import { settingsFormSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";

function SettingsFormWrapper() {
  const form = useForm<z.infer<typeof settingsFormSchema>>({
    resolver: zodResolver(settingsFormSchema),
    defaultValues: {
      currency: "",
    },
  });

  const settingsSubmit = () => {};

  return <SettingsForm onSubmit={settingsSubmit} form={form} />;
}

export default SettingsFormWrapper;

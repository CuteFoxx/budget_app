import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import Card from "@/components/authentication-forms/Card";
import { registerFormSchema as formSchema } from "@/schema";
import { Link } from "react-router";
import { PasswordInput } from "@/components/ui/passwordInput";
import { customFetch } from "@/utils/customFetch";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";

function Registration() {
  const [pending, setPending] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState<null | string>(
    null
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setPending(true);
    customFetch(`register`, values)
      .then((res) => {
        if (res.ok) {
          setPending(false);
          setConfirmationMessage(
            "Please confirm your email address to proceed"
          );
        } else if (res.status == 403) {
          setConfirmationMessage(
            "Please confirm your email address to proceed"
          );
        }
        return res.json();
      })
      .then((data) => {
        if (data != null && typeof data != "object") {
          setPending(false);
          form.setError("root", {
            message: data,
          });
        }
      });
  }

  return (
    <div className="app-container min-h-screen flex flex-col items-center justify-center">
      <Card className="w-full mx-auto sm:max-w-[75%] md:max-w-[50%] xl:max-w-[35%] flex flex-col gap-4 md:gap-8">
        {confirmationMessage ? (
          <div className="text-center">{confirmationMessage}</div>
        ) : (
          <>
            <h1 className="title text-center">sign up</h1>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 "
              >
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="Username" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="example@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <PasswordInput placeholder="Password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button disabled={pending} type="submit">
                  {pending ? (
                    <LoaderCircle className="animate-spin" />
                  ) : (
                    "Submit"
                  )}
                </Button>
                <FormMessage>{form.formState.errors.root?.message}</FormMessage>
              </form>
            </Form>

            <div>
              <p>
                Already have an account?{" "}
                <Link
                  className="text-purple-500 underline hover:no-underline"
                  to="/login"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}

export default Registration;

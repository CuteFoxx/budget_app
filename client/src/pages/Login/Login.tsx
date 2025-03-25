import Card from "@/components/authentication-forms/Card";
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
import { PasswordInput } from "@/components/ui/passwordInput";
import { loginFormSchema } from "@/schema";
import { customFetch } from "@/utils/customFetch";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { z } from "zod";

function Login() {
  const [pending, setPending] = useState(false);
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof loginFormSchema>) {
    setPending(true);

    customFetch(`login_check`, {
      username: values.email,
      password: values.password,
    }).then((response) => {
      if (response.ok) {
        navigate("/app");
      }
    });
  }

  return (
    <div className="app-container min-h-screen flex flex-col items-center justify-center">
      <Card className="w-full mx-auto sm:max-w-[75%] md:max-w-[50%] xl:max-w-[35%] flex flex-col gap-4 md:gap-8">
        <h1 className="title text-center">sign in</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 ">
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
              {pending ? <LoaderCircle className="animate-spin" /> : "Submit"}
            </Button>
          </form>
        </Form>

        <div>
          <p>
            Dont haven an account?{" "}
            <Link
              className="text-purple-500 underline hover:no-underline"
              to="/registration"
            >
              Sign up
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
}

export default Login;

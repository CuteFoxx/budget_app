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
import { API_URL } from "@/config";
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

    fetch(`${API_URL}/login_check`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: values.email,
        password: values.password,
      }),
    }).then((res) => {
      if (res.ok) {
        navigate("/app");
      } else if (res.status == 401) {
        form.setError("root", {
          message: "Please confirm your email in order to log in",
        });
        setPending(false);
      }

      return res.json();
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
            <FormMessage>{form.formState.errors.root?.message}</FormMessage>
          </form>
        </Form>

        <div>
          <p>
            Dont have an account?
            <Link
              className="text-purple-500 underline hover:no-underline ml-1"
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

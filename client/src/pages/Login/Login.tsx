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
import { API_URL } from "@/config";
import { loginFormSchema } from "@/schema";
import { setToken } from "@/state/TokenSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router";
import { z } from "zod";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      dispatch(setToken(localStorage.getItem("token")));
      navigate("/app");
    }
  }, []);

  function onSubmit(values: z.infer<typeof loginFormSchema>) {
    fetch(`${API_URL}/login_check`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: values.email,
        password: values.password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.token === undefined || data.token === null) {
          throw new Error("Token is undefined");
        } else {
          console.log(data);

          localStorage.setItem("token", data.token);
          dispatch(setToken(data.token));
          navigate("/app");
        }
      })
      .catch((error) => console.error("Error:", error));
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
                    <Input placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
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

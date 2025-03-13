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
import { Link, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setRefreshToken, setToken } from "@/state/TokenSlice";
import { useEffect } from "react";
import { API_URL } from "@/config";

function Registration() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      dispatch(setToken(localStorage.getItem("token")));
      dispatch(setRefreshToken(localStorage.getItem("refreshToken")));
      navigate("/app");
    }
  }, []);

  function onSubmit(values: z.infer<typeof formSchema>) {
    fetch(`${API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.token === undefined || data.token === null) {
          throw new Error("Token is undefined");
        } else {
          dispatch(setToken(data.token));
          dispatch(setRefreshToken(data.refresh_token));
          localStorage.setItem("token", data.token);
          localStorage.setItem("refreshToken", data.refresh_token);
          navigate("/app");
        }
      })
      .catch((error) => console.error("Error:", error));
  }

  return (
    <div className="app-container min-h-screen flex flex-col items-center justify-center">
      <Card className="w-full mx-auto sm:max-w-[75%] md:max-w-[50%] xl:max-w-[35%] flex flex-col gap-4 md:gap-8">
        <h1 className="title text-center">sign up</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 ">
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
            Already have an account?{" "}
            <Link
              className="text-purple-500 underline hover:no-underline"
              to="/login"
            >
              Sign in
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
}

export default Registration;

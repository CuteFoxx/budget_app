import { API_URL } from "@/config";
import { toast } from "sonner";

export const customFetch = (
  url: string,
  data: object,
  method = "POST"
): Promise<Response> => {
  const options = {
    method: method,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  } as RequestInit;

  if (method != "GET" && method != "HEAD") {
    options.body = JSON.stringify(data);
  }

  return fetch(`${API_URL}/${url}`, options).then((res) => {
    if (res.status === 401) {
      fetch(`${API_URL}/token/refresh`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        if (!res.ok || res.status == 401) {
          toast("Sesion expired please relogin, redirecting to login page", {
            position: "top-center",
          });
          setTimeout(() => {
            window.location.href = "/login";
            localStorage.removeItem("loggedIn");
          }, 2000);
        }

        toast("Token expired refreshing page", { position: "top-center" });
        setTimeout(() => {
          location.reload();
        }, 2000);
      });
    }

    return res;
  });
};

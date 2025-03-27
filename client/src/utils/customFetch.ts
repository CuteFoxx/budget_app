import { API_URL } from "@/config";

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
        if (!res.ok || res.status == 204) {
          window.location.href = "/login";
          localStorage.removeItem("loggedIn");
        }
      });
    }

    return res;
  });
};

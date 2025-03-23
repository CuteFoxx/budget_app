import { API_URL } from "@/config";

export const customFetch = (
  url: string,
  data: object,
  method = "POST"
): Promise<Response> => {
  return fetch(`${API_URL}/${url}`, {
    method: method,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => {
    if (res.status === 401) {
      fetch(`${API_URL}/token/refresh`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        if (!res.ok) {
          window.location.href = "/login";
          localStorage.removeItem("loggedIn");
        } else {
          console.log("refreshed");
        }
      });
    }

    return res;
  });
};

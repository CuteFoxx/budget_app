import { API_URL } from "@/config";

export const deleteData = (url: string, data: object): Promise<Response> => {
  return fetch(`${API_URL}/${url}`, {
    method: "DELETE",
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

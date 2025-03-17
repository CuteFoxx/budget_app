import { API_URL } from "@/config";

export const postData = (url: string, data: object): Promise<Response> => {
  return fetch(`${API_URL}/${url}`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

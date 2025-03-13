import { API_URL } from "@/config";

export default function refreshToken({
  refresh_token,
}: {
  refresh_token: string;
}) {
  let token = "";
  let refreshToken = "";
  let isAuthenticated = false;

  fetch(`${API_URL}/token/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      refresh_token: refresh_token,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      localStorage.setItem("token", data.token);
      localStorage.setItem("refreshToken", data.refresh_token);

      token = data.token;
      refreshToken = data.refresh_token;
      isAuthenticated = true;
    })
    .catch((error) => {
      isAuthenticated = false;
    });

  return { token, refreshToken, isAuthenticated };
}

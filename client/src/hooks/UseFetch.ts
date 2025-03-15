import { API_URL } from "@/config";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

type UseFetchProps = {
  url: string;
};

type UseFetchReturn<T> = {
  data: T | undefined;
  isLoading: boolean;
};

function useFetch<T>({ url }: UseFetchProps): UseFetchReturn<T> {
  const nav = useNavigate();
  const [data, setData] = useState<T | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  function fetchData(url: string, token?: string) {
    return fetch(url, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
  }

  function refreshToken() {
    fetchData(`${API_URL}/token/refresh`)
      .then((res) => {
        if (!res.ok) return handleUnAuthorized;

        fetchData(url)
          .then((res) => res.json())
          .then((data) => {
            if (typeof data === "string") {
              data = JSON.parse(data);
            }
            setData(data);
            setIsLoading(false);
          });
      })
      .catch(() => handleUnAuthorized);
  }

  function handleUnAuthorized() {
    localStorage.removeItem("isLoggedIn");
    nav("/login");
  }

  useEffect(() => {
    fetchData(url)
      .then((res) => {
        if (res.status === 401 || !res.ok) {
          refreshToken();
        }
        return res.json();
      })
      .then((resData) => {
        if (typeof resData === "string") {
          resData = JSON.parse(resData);
        }
        setData(resData);
        setIsLoading(false);
      })
      .catch(() => refreshToken());
  }, []);

  return { data, isLoading };
}

export default useFetch;

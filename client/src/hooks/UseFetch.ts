import { API_URL } from "@/config";
import { setRefreshToken, setToken } from "@/state/TokenSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

type UseFetchProps = {
  url: string;
  tokens: {
    token: string;
    refreshToken: string;
  };
};

type UseFetchReturn<T> = {
  data: T | undefined;
  isLoading: boolean;
};

function useFetch<T>({ url, tokens }: UseFetchProps): UseFetchReturn<T> {
  const [data, setData] = useState<T | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const nav = useNavigate();
  const dispatch = useDispatch();

  function fetchData(url: string, token?: string) {
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token ? token : tokens.token}`,
      },
    });
  }

  function refreshToken() {
    fetch(`${API_URL}/token/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refresh_token: tokens.refreshToken,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("token", data.token);
        localStorage.setItem("refreshToken", data.refresh_token);
        dispatch(setToken(data.token));
        dispatch(setRefreshToken(data.refresh_token));

        fetchData(url, data.token)
          .then((res) => res.json())
          .then((data) => {
            if (typeof data === "string") {
              data = JSON.parse(data);
            }
            setData(data);
          });
      })
      .catch(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        dispatch(setToken(""));
        dispatch(setRefreshToken(""));
        nav("/login");
      });
  }

  useEffect(() => {
    fetchData(url)
      .then((res) => {
        if (res.status === 401) {
          refreshToken();
        }
        return res.json();
      })
      .then((resData) => {
        if (typeof resData === "string") {
          resData = JSON.parse(resData);
        }
        setData(resData);
      })
      .catch((err) => {
        refreshToken();
      })
      .finally(() => setIsLoading(false));
  }, []);

  return { data, isLoading };
}

export default useFetch;

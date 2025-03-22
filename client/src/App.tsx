import { Outlet } from "react-router";
import { ThemeProvider, useTheme } from "./components/ui/ThemeProvider";
import { ModeToggle } from "./components/ui/mode-toggle";
import Header from "./components/app/Header";
import { Menu } from "lucide-react";
import SideNav from "./components/app/SideNav";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setIsMenuMinimized } from "./state/MenuSlice";
import { Toaster } from "sonner";
import useFetch from "./hooks/UseFetch";
import { UserSettings } from "./types/UserSettings";
import { API_URL } from "./config";
import { setCurrencies, setSettings } from "./state/SettingsSlice";
import { Currency } from "./types/Currency";

function App() {
  const theme = useTheme();

  const [isMinimized, setIsMinimized] = useState(
    JSON.parse(localStorage.getItem("isMenuMinimized") ?? "false")
  );
  const { data: userSettings } = useFetch<UserSettings>({
    url: `${API_URL}/user/settings`,
  });
  const { data: currencies } = useFetch<Currency[]>({
    url: `${API_URL}/currencies`,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (userSettings != null) dispatch(setSettings(userSettings));
  }, [userSettings]);

  useEffect(() => {
    if (currencies != null) dispatch(setCurrencies(currencies));
  }, [currencies]);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="flex flex-col min-h-screen overflow-x-hidden">
        <Header>
          <Menu
            className="cursor-pointer ml-4"
            onClick={() => {
              setIsMinimized(!isMinimized);
              dispatch(setIsMenuMinimized(!isMinimized));
              localStorage.setItem(
                "isMenuMinimized",
                JSON.stringify(!isMinimized)
              );
            }}
          />
          <ModeToggle />
        </Header>
        <main className="flex flex-col grow app-container h-full md:flex md:flex-row">
          <SideNav />
          <div className="p-4 md:p-8 md:flex-grow">
            <Outlet />
          </div>
        </main>
      </div>
      <Toaster theme={theme.theme} />
    </ThemeProvider>
  );
}

export default App;

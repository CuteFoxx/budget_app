import { Outlet } from "react-router";
import { ThemeProvider, useTheme } from "./components/ui/ThemeProvider";
import { ModeToggle } from "./components/ui/mode-toggle";
import Header from "./components/app/Header";
import { Menu } from "lucide-react";
import SideNav from "./components/app/SideNav";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsMenuMinimized,
  setIsMenuOpen,
  setIsTablet,
} from "./state/MenuSlice";
import { Toaster } from "sonner";
import useFetch from "./hooks/UseFetch";
import { UserSettings } from "./types/UserSettings";
import { API_URL } from "./config";
import { setCurrencies, setSettings } from "./state/SettingsSlice";
import { Currency } from "./types/Currency";
import { addCategories } from "./state/CategorySlice";
import { addExpenses } from "./state/ExpenseSlice";
import { categoryName } from "./types/CategoryName";
import { Expense } from "./types/Expense";
import { RootState } from "./state/Store";

function App() {
  const theme = useTheme();
  const [isMinimized, setIsMinimized] = useState(
    JSON.parse(localStorage.getItem("isMenuMinimized") ?? "false")
  );
  const isTablet = useSelector((state: RootState) => state.menu.isTablet);
  const isMenuOpen = useSelector((state: RootState) => state.menu.isMenuOpen);

  const { data: userSettings } = useFetch<UserSettings>({
    url: `${API_URL}/user/settings`,
  });
  const { data: currencies } = useFetch<Currency[]>({
    url: `${API_URL}/currencies`,
  });
  const { data: expenses } = useFetch<Expense[]>({
    url: `${API_URL}/expenses`,
  });
  const { data: categories } = useFetch<categoryName[]>({
    url: `${API_URL}/expenses/categories`,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (userSettings != null) dispatch(setSettings(userSettings));
  }, [userSettings]);

  useEffect(() => {
    if (currencies != null) dispatch(setCurrencies(currencies));
  }, [currencies]);
  useEffect(() => {
    if (expenses != null) dispatch(addExpenses(expenses));
  }, [expenses]);

  useEffect(() => {
    if (categories != null) dispatch(addCategories(categories));
  }, [categories]);

  useEffect(() => {
    checkWindowSize();
    window.addEventListener("resize", checkWindowSize);
  }, []);

  function checkWindowSize() {
    if (window.innerWidth >= 768) {
      dispatch(setIsTablet(true));
      dispatch(setIsMenuOpen(false));
    } else {
      dispatch(setIsTablet(false));
    }
  }

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="flex flex-col min-h-screen">
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

              if (!isTablet) {
                dispatch(setIsMenuOpen(!isMenuOpen));
              } else {
                dispatch(setIsMenuOpen(false));
              }
            }}
          />
          <ModeToggle />
        </Header>
        <main className="flex flex-col grow app-container h-full md:flex md:flex-row">
          <SideNav />
          <div
            className={`p-4 md:p-8 md:flex-grow ${
              isMinimized ? "!pl-[6.5rem]" : "!pl-[11.5rem]"
            }`}
          >
            <Outlet />
          </div>
        </main>
      </div>
      <Toaster theme={theme.theme} />
    </ThemeProvider>
  );
}

export default App;

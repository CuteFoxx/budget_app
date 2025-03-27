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
import { setCurrencies, setSettings } from "./state/SettingsSlice";
import { addExpenses, addCategories } from "./state/ExpenseSlice";
import { RootState } from "./state/Store";
import { customFetch } from "./utils/customFetch";
import { addIncomes } from "./state/IncomeSlice";

function App() {
  const theme = useTheme();
  const [isMinimized, setIsMinimized] = useState(
    JSON.parse(localStorage.getItem("isMenuMinimized") ?? "false")
  );
  const isTablet = useSelector((state: RootState) => state.menu.isTablet);
  const isMenuOpen = useSelector((state: RootState) => state.menu.isMenuOpen);

  const dispatch = useDispatch();

  customFetch("expenses", {}, "GET")
    .then((res) => res.json())
    .then((data) => dispatch(addExpenses(JSON.parse(data))));

  customFetch("incomes", {}, "GET")
    .then((res) => res.json())
    .then((data) => dispatch(addIncomes(JSON.parse(data))));

  customFetch("user/settings", {}, "GET")
    .then((res) => res.json())
    .then((data) => dispatch(setSettings(JSON.parse(data))));

  customFetch("expenses/categories", {}, "GET")
    .then((res) => res.json())
    .then((data) => dispatch(addCategories(JSON.parse(data))));

  customFetch("currencies", {}, "GET")
    .then((res) => res.json())
    .then((data) => dispatch(setCurrencies(JSON.parse(data))));

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

import { Outlet } from "react-router";
import { ThemeProvider, useTheme } from "./components/ui/ThemeProvider";
import { ModeToggle } from "./components/ui/mode-toggle";
import Header from "./components/app/Header";
import { Menu } from "lucide-react";
import SideNav from "./components/app/SideNav";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setIsMenuMinimized } from "./state/MenuSlice";
import { Toaster } from "sonner";

function App() {
  const theme = useTheme();

  const [isMinimized, setIsMinimized] = useState(
    JSON.parse(localStorage.getItem("isMenuMinimized") ?? "false")
  );

  const dispatch = useDispatch();

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

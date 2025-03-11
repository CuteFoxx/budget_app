import { Outlet } from "react-router";
import { ThemeProvider } from "./components/ui/ThemeProvider";
import { ModeToggle } from "./components/ui/mode-toggle";
import Header from "./components/app/Header";
import { Menu } from "lucide-react";
import SideNav from "./components/app/SideNav";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="flex flex-col min-h-screen">
        <Header>
          <Menu />
          <ModeToggle />
        </Header>
        <main className="flex flex-col grow app-container h-full md:grid md:grid-cols-[12rem_1fr]">
          <SideNav />
          <div className="p-4 md:p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;

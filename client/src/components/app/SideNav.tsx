import { NavLink } from "react-router";
import { LayoutGrid, Settings } from "lucide-react";

function SideNav() {
  return (
    <aside className="py-4 flex flex-col gap-2 dark:border-neutral-800 border-neutral-100 border-r-1 h-full">
      <NavLink className="sidenav-item" to="/app" end>
        <LayoutGrid />
        <h2>Overview</h2>
      </NavLink>
      <NavLink className="sidenav-item" to="/app/settings" end>
        <Settings />
        <h2>Settings</h2>
      </NavLink>
    </aside>
  );
}

export default SideNav;

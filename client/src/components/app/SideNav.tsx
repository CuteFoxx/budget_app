import { LayoutGrid, Settings } from "lucide-react";
import SideNavLink from "./SideNavLink";

function SideNav() {
  return (
    <aside className="py-4 flex flex-col gap-2 dark:border-neutral-800 border-neutral-100 border-r-1 w-fit">
      <SideNavLink to="/app" title="Overview">
        <LayoutGrid />
      </SideNavLink>
      <SideNavLink to="/app/settings" title="Settings">
        <Settings />
      </SideNavLink>
    </aside>
  );
}

export default SideNav;

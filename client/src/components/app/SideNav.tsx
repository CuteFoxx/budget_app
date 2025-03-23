import { LayoutGrid, User } from "lucide-react";
import SideNavLink from "./SideNavLink";
import { useSelector } from "react-redux";
import { RootState } from "@/state/Store";

function SideNav() {
  const isMenuOpen = useSelector((state: RootState) => state.menu.isMenuOpen);
  const isTablet = useSelector((state: RootState) => state.menu.isTablet);
  return (
    <aside
      className={`transition-transform duration-500 fixed  z-[5] md:z-[1] dark:bg-neutral-900/90 bg-white h-screen md:h-[90vh] py-4 flex flex-col gap-2 dark:border-neutral-800 border-neutral-100 border-r-1 w-fit ${
        !isTablet ? (isMenuOpen ? "translate-x-[0]" : "-translate-x-full") : ""
      }`}
    >
      <SideNavLink to="/app" title="Overview">
        <LayoutGrid />
      </SideNavLink>
      <SideNavLink to="/app/settings" title="Account" className="md:mt-auto">
        <User className="md:-translate-x-[0.25rem]" />
      </SideNavLink>
    </aside>
  );
}

export default SideNav;

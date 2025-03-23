import { RootState } from "@/state/Store";
import { HTMLAttributes } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router";

interface SideNaveLinkProps extends HTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  to: string;
  title: string;
}

function SideNavLink({ children, to, title, ...props }: SideNaveLinkProps) {
  const { className, ...rest } = props;
  const isTablet = useSelector((state: RootState) => state.menu.isTablet);
  const isMenuMinimized = useSelector(
    (state: any) => state.menu.isMenuMinimized
  );

  return (
    <NavLink
      className={`sidenav-item text-left ${className ?? ""}`}
      to={to}
      end
      {...rest}
    >
      {children}
      <h2
        className={`${
          isTablet ? (!isMenuMinimized ? "md:!block" : "md:!hidden") : ""
        }`}
      >
        {title}
      </h2>
    </NavLink>
  );
}

export default SideNavLink;

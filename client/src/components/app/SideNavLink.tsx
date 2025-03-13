import { useSelector } from "react-redux";
import { NavLink } from "react-router";

type SideNaveLinkProps = {
  children: React.ReactNode;
  to: string;
  title: string;
};

function SideNavLink({ children, to, title }: SideNaveLinkProps) {
  const isMenuMinimized = useSelector(
    (state: any) => state.menu.isMenuMinimized
  );

  return (
    <NavLink className="sidenav-item" to={to} end>
      {children}
      <h2
        className={`hidden lg:block ${
          !isMenuMinimized ? "md:!block" : "md:!hidden"
        }`}
      >
        {title}
      </h2>
    </NavLink>
  );
}

export default SideNavLink;

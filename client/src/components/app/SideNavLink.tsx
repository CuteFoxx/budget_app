import { NavLink } from "react-router";

type SideNaveLinkProps = {
  children: React.ReactNode;
  to: string;
  title: string;
};

function SideNavLink({ children, to, title }: SideNaveLinkProps) {
  return (
    <NavLink className="sidenav-item" to={to} end>
      {children}
      <h2 className="hidden lg:block">{title}</h2>
    </NavLink>
  );
}

export default SideNavLink;

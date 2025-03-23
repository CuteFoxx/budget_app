interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

function Header({ children, ...props }: HeaderProps) {
  const { className, ...rest } = props;

  return (
    <div
      className={`py-4 border-b-1 bg-white dark:bg-neutral-900 dark:border-neutral-800 border-neutral-200 sticky top-0 z-10 ${
        className ?? ""
      }`}
      {...rest}
    >
      <div className="app-container flex items-center justify-between">
        {children}
      </div>
    </div>
  );
}
export default Header;

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

function Card({ children, ...props }: CardProps) {
  const { className, ...rest } = props;

  return (
    <div
      className={`shadow-xs dark:shadow-md dark:shadow-neutral-800/20 border-neutral-100 dark:border-neutral-800 border-1 p-4 md:p-8 rounded-lg ${
        className ?? ""
      }`}
      {...rest}
    >
      {children}
    </div>
  );
}

export default Card;

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

function Card({ children, ...props }: CardProps) {
  const { className, ...rest } = props;

  return (
    <div
      className={`border-1 border-neutral-300/60 shadow-lg dark:shadow-neutral-800/20  dark:border-neutral-800 p-4 md:p-8 rounded-lg ${
        className ?? ""
      }`}
      {...rest}
    >
      {children}
    </div>
  );
}

export default Card;

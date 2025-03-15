import { Expense as expense } from "@/types/Expense";
import { TableCell, TableRow } from "@/components/ui/table";

type ExpenseProps = {
  expense: expense;
};

function Expense({ expense }: ExpenseProps) {
  console.log(expense);

  return (
    <TableRow>
      <TableCell>{expense?.name ?? ""}</TableCell>
      <TableCell>{expense?.amount ?? ""}</TableCell>
      <TableCell>{expense?.expenseCategory?.name ?? ""}</TableCell>
    </TableRow>
  );
}

export default Expense;

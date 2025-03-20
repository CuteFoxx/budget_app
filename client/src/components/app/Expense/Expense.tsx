import { Expense as expense } from "@/types/Expense";
import { TableCell, TableRow } from "@/components/ui/table";
import { DataTable } from "@/components/ui/dataTable";
import { ExpenseColumns } from "./ExpenseTable/ExpenseColumns";

type ExpenseProps = {
  expense: expense;
};

function Expense({ expense }: ExpenseProps) {
  return (
   
    // <TableRow>
    //   <TableCell>{expense?.name ?? ""}</TableCell>
    //   <TableCell>{expense?.amount ?? ""}</TableCell>
    //   <TableCell>{expense?.expenseCategory?.name ?? ""}</TableCell>
    // </TableRow>
  );
}

export default Expense;

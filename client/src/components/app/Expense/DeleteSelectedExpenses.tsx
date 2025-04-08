import { Trash2 } from "lucide-react";
import { Button } from "../../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { addSelectedExpenses } from "@/state/SelectedItemsSlice";
import { customFetch } from "@/utils/customFetch";
import { RootState } from "@/state/Store";
import { addExpenses } from "@/state/ExpenseSlice";

interface DeleteSelectedProps {
  ids: number[];
}

export default function DeleteSelected({ ids }: DeleteSelectedProps) {
  const dispatch = useDispatch();
  const expenses = useSelector((state: RootState) => state.expenses.items);

  const handleDelete = () => {
    dispatch(addSelectedExpenses([]));
    dispatch(addExpenses(expenses.filter((item) => !ids.includes(item.id))));

    customFetch("expenses", { id: ids }, "DELETE");
  };

  return (
    <Button onClick={handleDelete} className="text-red-600">
      Delete selected <Trash2 />
    </Button>
  );
}

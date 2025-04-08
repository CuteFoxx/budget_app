import { Trash2 } from "lucide-react";
import { Button } from "../../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { addSelectedIncomes } from "@/state/SelectedItemsSlice";
import { customFetch } from "@/utils/customFetch";
import { RootState } from "@/state/Store";
import { addIncomes } from "@/state/IncomeSlice";

interface DeleteSelectedProps {
  ids: number[];
}

export default function DeleteSelectedIncomes({ ids }: DeleteSelectedProps) {
  const dispatch = useDispatch();
  const incomes = useSelector((state: RootState) => state.incomes.items);

  const handleDelete = () => {
    dispatch(addSelectedIncomes([]));
    dispatch(addIncomes(incomes.filter((item) => !ids.includes(item.id))));

    customFetch("incomes", { id: ids }, "DELETE");
  };

  return (
    <Button onClick={handleDelete} className="text-red-600">
      Delete selected <Trash2 />
    </Button>
  );
}

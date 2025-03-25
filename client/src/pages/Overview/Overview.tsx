import Expenses from "@/components/app/Expense/Expenses";
import Incomes from "@/components/app/Income/Incomes";

function Overview() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <Expenses />
      <Incomes />
    </div>
  );
}

export default Overview;

export type Expense = {
  id: number;
  name: string;
  expenseCategory: ExpenseCategory;
  amount: number;
  date: Date;
};

export type Expenses = {
  expenses: Expense[];
};

export type ExpenseCategory = {
  name: string;
};

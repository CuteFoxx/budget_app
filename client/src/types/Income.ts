export type Income = {
  id: number;
  name: string;
  incomeCategory: IncomeCategory;
  amount: number;
  date: Date;
};

export type Incomes = {
  incomes: Income[];
};

export type IncomeCategory = {
  name: string;
};

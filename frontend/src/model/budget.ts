export default interface Budget {
  id?: number;
  accountId: string;
  categoryType: string;
  category: string;
  transaction?: string;
  amount: number;
  date: string;
  budgetMonth: string;
  note?: never;
}
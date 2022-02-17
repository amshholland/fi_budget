export default interface Budget {
  budgetId?: number;
  accountId: string;
  categoryType: string;
  category: string;
  amount: number;
  date: string;
}
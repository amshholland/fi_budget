export default interface Budget {
  id?: number;
  accountId: string;
  category: string;
  categoryType: string;
  amount: number;
  date: string;
  budgetMonth: string;
}
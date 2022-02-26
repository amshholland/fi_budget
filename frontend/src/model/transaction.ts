export default interface Transaction {
  id?: number;
  accountId: string;
  categoryType?: never;
  category: string;
  transaction: string;
  amount: number;
  date: string;
  budgetMonth: string;
  note: string;
}
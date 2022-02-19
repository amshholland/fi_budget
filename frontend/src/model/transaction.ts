export default interface Transaction {
  id?: number;
  accountId: string;
  category: string;
  amount: number;
  date: string;
  budgetMonth: string;
  note: string;
}
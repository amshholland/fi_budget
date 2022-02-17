export default interface Transaction {
  transactionId?: number;
  accountId: string;
  category: string;
  amount: number;
  date: string;
  budgetMonth: string;
  note: string;
}
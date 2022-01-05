export default interface Budget {
  transactionId?: string;
  accountId: string;
  type: string;
  category: string;
  amount: number;
  date: string;
  note: string;
}
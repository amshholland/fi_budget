export default interface Budget {
  transactionId?: number;
  accountId: string;
  categoryType: string;
  category: string;
  amount: string;
  date: string;
  note: string;
}
export default interface Budget {
  transactionId?: string;
  accountId: string;
  categoryType: string;
  category: string;
  amount: string;
  date: string;
  note: string;
}
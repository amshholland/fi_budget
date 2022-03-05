import './Tables/Tables.css';

import { EditTransactions } from "./EditTransactions";
import { TransactionData } from "./TransactionData";

export function Transactions() {
  return (
    <div className="Transactions">
      <TransactionData />
      <EditTransactions />
    </div>
  );
}
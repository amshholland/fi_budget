import Budget from "../../model/budget";
import Transaction from "../../model/transaction";

interface Props {
  row: Budget | Transaction;
  sendTo: string;
}
export function DataRow( { row, sendTo }: Props ) {
  return (
    <>
      { sendTo === "budget" &&
        ( <td>{ row.categoryType }</td>
        ) }
      <td>{ row.category }</td>
      { sendTo === "transaction" &&
        ( <td>{ row.transaction }</td>
        ) }
      <td className="amount">${ row.amount }</td>
      <td className="date">{ row.date }</td>
    </>
  );
}
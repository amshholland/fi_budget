import Transaction from "../../model/transaction";
import Budget from "../../model/budget";

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
      <td>${ row.amount }</td>
      <td>{ row.date }</td>
    </>
  );
}
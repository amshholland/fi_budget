import '../Tables.css';

import Budget from '../../model/budget';
import Transaction from '../../model/transaction';

interface ObjectType {
  rows: Budget[] | Transaction[] 
}

export function GenericTable( { rows }: ObjectType ) {
  rows!.map( ( row ) => {
    console.log( typeof row );
    Object.keys( row ).forEach( ( key, value ) =>
      console.log( row.accountId )
    );
  } );


  return (
    <tbody>
      { rows !== null && (
        <>
          { rows.map( ( row, idx ) => (
            <tr key={ idx }>
              {/* { row.categoryType && ( <td>{ row.categoryType }</td> ) } */ }
              <td>{ row.category }</td>
              <td>${ row.amount }</td>
              <td>{ row.date }</td>
            </tr>
          ) ) }
        </>
      ) }

    </tbody>
  );
};
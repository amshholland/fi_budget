import '../Tables.css';

import Budget from '../../model/budget';
import Transaction from '../../model/transaction';
import { useState } from 'react';

interface ObjectType {
  object: Budget | Transaction
}

type GenericTableProps<T> = {
  rows: Array<Budget> | Array<Transaction>;
};

export function GenericTable<T extends ObjectType>( { rows }: GenericTableProps<T> ) {
  const [ data, setData ] = useState<Budget[] | Transaction[]>( rows );
  data.map( ( row ) => {
    Object.keys( row ).forEach( ( key, value ) =>
      console.log( row.accountId )
    );
  } );


  return (
    <tbody className="GenericTable" >
      { data.map( ( row, idx ) => {
        <tr key={ idx }>
          <td>{ row.category }</td>
          <td>${ row.amount }</td>
          <td>{ row.date }</td>
        </tr>;
      } ) }
    </tbody>
  );
};
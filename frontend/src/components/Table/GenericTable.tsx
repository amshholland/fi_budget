import '../Tables.css';

import Budget from '../../model/budget';
import Transaction from '../../model/transaction';
import { useState } from 'react';

interface ObjectType {
  rows: Budget[] | Transaction[] 
}


export function GenericTable( { rows }: ObjectType ) {
  rows!.map( ( row ) => {
    console.log( row )
    Object.keys( row ).forEach( ( key, value ) =>
      console.log( row.accountId )
    );
  } );


  return (
    <tbody className="GenericTable" >
      <tr><td>1</td></tr>
      { rows !== null && (
        <tr>{ rows!.map( row =>
          <>
          <td>{ row.category }</td>
            <td>{ row.amount }</td>
            <td>{ row.date }</td>
          </>
        ) }</tr> ) }

      { rows!.map( ( row, idx ) => {
        <tr><td>2</td></tr>;
        // <tr key={ idx }>
        //   <td>{ row.category }</td>
        //   <td>${ row.amount }</td>
        //   <td>{ row.date }</td>
        // </tr>;
      } ) }
    </tbody>
  );
};
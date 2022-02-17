import '../Tables.css';

import Budget from '../../model/budget';
import Transaction from '../../model/transaction';

interface ObjectType {
  object: Array<Budget> | Array<Transaction>;
}

type GenericTableProps<T> = {
  rows: Array<Budget> | Array<Transaction>;
};

export function GenericTable<T extends ObjectType>( { rows }: GenericTableProps<T> ) {
  rows.map( ( row ) => {
    Object.keys( row ).map( function ( key, index ) {
      console.log( row[ index ] );
    } );
  } );

  return (
    <tbody className="GenericTable" >
      { rows.map( ( row, idx, array ) => {
        <tr key={ idx }>
          {/* { row.map( ( column ) => {
            <td> { column } </td>;
          } )
          } */}
          <> { row } </>;
        </tr>;
      } ) }
    </tbody>
  );
};
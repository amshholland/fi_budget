import './EditRowModal.css';

import { editExistingBudgetLineItem } from '../utils/EditBudget';
import { useState } from 'react';

export function EditRowModal( { row, handleClose } ) {
  const [ editRow, setEditRow ] = useState( row );
  const fieldNames = [ "accountId", "categoryType", "category", "amount", "date", "note", "transactionId" ];
  const inputTypes = [ "hidden", "text", "text", "number", "date", "text", "hidden" ];


  const updateState = ( e ) => {
    let column = e.target.attributes.column.value;
    let index = e.target.attributes.index.value;
    let value = e.target.value;

    const tempRow = [ row ];
    let tempObj = {};
    Object.assign( tempObj, row[ index ] );

    tempObj[ column ] = value;

    tempRow[ index ] = tempObj;
    setEditRow( tempRow );
    console.log( editRow );
  };

  const handleSubmit = () => {
    console.log( editRow );
    editExistingBudgetLineItem( editRow )
    console.log( `Form submitted` );
  };

  return (
    <div className="showHideClassName" >
      <button onClick={ handleClose }>x</button>
      <form>
        <table>
          <tbody>
            <tr>
              { fieldNames.map( ( column, index ) => (
                <td key={ index }>
                  <input
                    type={ inputTypes[ index ] }
                    column={ column }
                    placeholder={ row[ column ] }
                    value={ editRow[ column ] }
                    index={ index }
                    className="form-control"
                    onChange={ ( e ) => updateState( e ) }
                  />
                </td>
              ) ) }
              <td><button
                onClick={ handleSubmit }
                className="btn btn-success float-right"
              ><img src={ process.env.PUBLIC_URL + '/save_icon.png' } /></button></td>

            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
};
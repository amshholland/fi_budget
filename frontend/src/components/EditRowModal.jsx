import './EditRowModal.css';

import { useState } from 'react';

// import { editExistingBudgetLineItem } from '../utils/EditBudget';


export function EditRowModal( { row, handleClose } ) {
  const [ editRow, setEditRow ] = useState( row );
  const fieldNames = [ "accountId", "categoryType", "category", "amount", "date", "transactionId" ];
  const inputTypes = [ "hidden", "text", "text", "number", "date", "hidden" ];


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
  };

  const handleSubmit = () => {
    // editExistingBudgetLineItem( editRow )
  };

  return (
    <div className="EditRowModal" >
      <table className="Table">
          <tbody>
          <tr>
            <button className="closeButton" onClick={ handleClose }>x</button>

              { fieldNames.map( ( column, index ) => (
                <td key={ index }>
                  <input
                    type={ inputTypes[ index ] }
                    column={ column }
                    placeholder={ row[ column ] }
                    value={ editRow[ column ] }
                    index={ index }
                    className={ column }
                    onChange={ ( e ) => updateState( e ) }
                  />
                </td>
              ) ) }
              <td><button
                onClick={ handleSubmit }
                className='hiddenButton'
              ><img className="saveIcon" src={ process.env.PUBLIC_URL + '/save_icon.jpg' } /></button></td>
            </tr>
          </tbody>
      </table>
    </div>
  );
};
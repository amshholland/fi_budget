import Budget from '../model/budget';
import Transaction from '../model/transaction';
import { bulkDeleteBudgetLineItems } from '../utils/EditBudget';
import './DeleteRowModal.css';
import { DataRow } from './Tables/DataRow';

interface Props {
  rows: Budget[] | Transaction[];
  sendTo: string
  handleClose: () => void;
}

export function DeleteRowModal( { rows, handleClose, sendTo }: Props ) {

  return (
    <div className="DeleteRowModal" >
      <button className="closeButton" onClick={ handleClose }>x</button>
      <h4>Are you sure you want to remove the following row(s)?</h4>
      <div className="flexRow">
        <table className='Table'>
          { rows.map( row => (
            <DataRow row={ row } sendTo={ sendTo } />
          ) ) }
        </table>
        <button className="hiddenButton" onClick={ () => bulkDeleteBudgetLineItems( rows ) }>
          <img className="deleteIcon" src={ process.env.PUBLIC_URL + '/delete_icon.png' } />
        </button>
      </div>

    </div >
  );
};
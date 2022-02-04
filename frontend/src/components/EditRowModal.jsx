import './EditRowModal.css';

export function EditRowModal( { row, handleClose } ) {

  const handleSubmit = () => {
    console.log( `Form submitted` );
  };

  return (
    <div className="showHideClassName" >
      <button onClick={ handleClose }>x</button>
      <form>
        <table>
          <tbody>
            <tr>
              <td><input type="text" value={ row.categoryType } /></td>
              <td><input type="text" value={ row.category } /></td>
              <td><input type="number" value={ row.amount } /></td>
              <td><input type="date" value={ row.date } /></td>
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
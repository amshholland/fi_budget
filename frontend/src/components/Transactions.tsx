import { AuthContext } from "../context/auth-context";
import { useContext } from 'react';

export function Transactions() {
    const { user } = useContext( AuthContext );

    // Dynamically add and remove category text boxes
    function addFunction() {

    };
    return (
        <div className="Transactions">
            <h1>Transactions</h1>

            {/* // <!--- Add form data without refreshing / leaving page-- >
    // // < !---
    //         <script>
    //             $(document).on('submit', '#transactions', function () { 
                    //                 $.ajax( {
                    //                     url: $( this ).attr( '/add' ),
                    //                     type: $( this ).attr( 'POST' ),
                    //                     data: $( this ).serialize(),
                    //                     success: function ( data ) {
                    //                         alert( 'Submitted' );
                    //                     },
                    //                     error: function ( xhr, err ) {
                    //                         alert( 'Error' );
                    //                     }
                    //                 } );
                    //             return false;
                    //     });
                    //         </script>;
                    ---->*/}
            <form id="transactions" method="POST" action="/add">
                <div className="flex">

                    <div className="col">
                        <h2>Income</h2>
                        <table id="income">
                            <thead>
                                <tr>
                                    <th>Account</th>
                                    <th>Category</th>
                                    <th>Amount</th>
                                    <th>Pay Day</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><select className="cat" id="account" name="account">
                                        <option>Account</option>
                                        <option value="{{ row[0] }}">Account</option>
                                    </select></td>
                                    <input type="hidden" name="ie" id="ie" value="income" />
                                    <td><select className="cat" id="category" name="category">
                                        <option selected>Income Type</option>
                                        <option value="{{ row[0] }}">Income Type</option>
                                    </select></td>
                                    <td className="currency"><input type="text" className="number" name="amount" id="amount"
                                        placeholder="0.00" />
                                    </td>
                                    <td><input type="text" className="number" name="date" id="date" placeholder="yyyy-mm-dd" /></td>
                                    <td><input type="button" id="in_add" value="+" />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    {/* <script>
            // Dynamically add and remove rows
                        $(document).ready(function () {
                // Variables
                var newrow = '<tr><td><select className="cat" id="account" name="account"><option select>Account</option>{% for row in accounts %}<option value="{{ row[0] }}">{ { row[ 0 ] } }</option>{% endfor %}</select></td><input type="hidden" name="ie" id="ie" value="income" /><td><select className="cat" id="category" name="category"><option selected>Income Type</option>{% for row in incomes %}<option value="{{ row[0] }}">{ { row[ 0 ] } }</option>{% endfor %}</select></td><td><b>$</b><input type="text" className="number" name="amount" id="amount" placeholder="0.00" /></td><td><input type="text" className="number" name="date" id="date" placeholder="yyyy-mm-dd" /></td><td><input type="button" id="in_remove" value="x" /></td></tr>';

                        $("#in_add").click(function () {
                            $( "#income" ).append( newrow );
                });

                        // Remove rows from form
                        $("#income").on("click", "#in_remove", function () {
                            $( this ).closest( "tr" ).remove();
                });
            });
                    </script> */}

                    <div className="col_ex">
                        <h2>Expenses</h2>
                        <table id="table">
                            <thead>
                                <tr>
                                    <th>Account</th>
                                    <th>Category</th>
                                    <th>Amount</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="add">
                                    <td><select className="cat" id="account" name="account">
                                        <option >Account</option>
                                        <option value="{{ row[0] }}">Account</option>
                                    </select></td>
                                    <input type="hidden" name="ie" id="ie" value="expense" />
                                    <td><select className="cat" id="category" name="category">
                                        <option>Expense Type</option>
                                        <option value="{{ row[0] }}">Expense Type</option>
                                    </select></td>
                                    <td className="currency"><input type="text" className="number" name="amount" id="amount"
                                        placeholder="0.00" />
                                    </td>
                                    <input type="hidden" name="date" id="date" value="{{ bud_day }}" />
                                    <td><input type="button" onClick={ () => addFunction() } id=" ex_add" value="+" /></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="col">
                        <h2>Bills</h2>
                        <table id="table">
                            <thead>
                                <tr>
                                    <th>Account</th>
                                    <th>Category</th>
                                    <th>Amount</th>
                                    <th>Due Date</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="add">
                                    <td><select className="cat" id="account" name="account">
                                        <option>Account</option>
                                        <option value="{{ row[0] }}">Account</option>
                                    </select></td>
                                    <input type="hidden" name="ie" id="ie" value="bill" />
                                    <td><select className="cat" id="category" name="category">
                                        <option selected>Type of Bill</option>
                                        <option value="{{ row[0] }}">Type of Bill</option>
                                    </select></td>
                                    <td className="currency"><input type="text" className="number" name="amount" id="amount"
                                        placeholder="0.00" />
                                    </td>
                                    <td><input type="text" className="number" name="date" id="date" placeholder="yyyy-mm-dd" /></td>
                                    <td><input type="button" onClick={ () => addFunction() } id="bill_add" value="+" /></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    {/* <!--<script>
            // // Dynamically add and remove category text boxes
            //                 $(document).ready(function () {
            //     // Variables
            //     var newrow = '<tr><td><select className="cat" id="account" name="account"><option select>Account</option>{% for row in accounts %}<option value="{{ row[0] }}">{ { row[ 0 ] } }</option>{% endfor %}</select></td><input type="hidden" name="ie" id="ie" value="bill" /><td><select className="cat" id="category" name="category"><option selected>Type of Bill</option>{% for row in bills %}<option value="{{ row[0] }}">{ { row[ 0 ] } }</option>{% endfor %}</select></td><td><b>$</b><input type="text" className="number" name="amount" id="amount" placeholder="0.00" /></td><td><input type="text" className="number" name="date" id="date" placeholder="yyyy-mm-dd" /></td><td><input type="button" id="bill_remove" value="x" /></td></tr>';
            //                 // Add rows to form
            //                 $("#bill_add").click(function () {
            //                     $( "#bills" ).append( newrow );
            //     });

            //                 // Remove rows from form
            //                 $("#bills").on("click", "#bill_remove", function () {
            //                     $( this ).closest( "tr" ).remove();
            //     });
            // });
            //             </script>--> */}
                </div>
                <input type="submit" value="Submit" />
            </form >

            <h1>Upload Spreadsheet Bank Statement</h1>
            <div className="tbl_border">
                <div className="mb-3">
                    <form method="POST" action="/import_csv" encType="multipart/form-data">
                        <input className="form-control form-control-sm" name="file" id="formFileSm" type="file" />
                        <p><input type="submit" value="Submit" /></p>
                    </form>
                </div>
            </div>
            {/* //     <script>
    // // Dynamically add and remove category text boxes
    //         function addFunction() {
    //     // Variables
    //     var row = document.querySelector(".add");
    //         var clone = row.cloneNode(true);
    //         console.log(clone);

    //         document.getElementById("table").appendChild(clone);
    // };
    //     </script>; */}
        </div >
    );
};;;;;;;;;;;;
import { AuthContext } from "../context/auth-context";
import { useContext } from 'react';

export function Create() {
    const { user } = useContext( AuthContext );

    function addRow() {

    }

    function deleteRow() {

    }

    return (
        <div className="Create">
            <h1 className="h1">Create Your Budget</h1>
            <h2>Customize your budget with categories and types based on your personal preferances.</h2>
            <p>
                The amounts added now are estimates.<br />
                The categories created will be available each month. You'll be able to modify the estimated amounts and due dates if
                necessary.<br />
                You will also be able add categories as needed but remember to keep them as consistent as possible for trend and goal achievment purposes.</p>
            <form method="POST" action="/add">
                <div className="container">
                    <div className="row">

                        <div className="col-md-auto">
                            <h2>Income</h2>
                            <table className="table table-striped" id="income">
                                <thead>
                                    <tr>
                                        <th scope="col">Category</th>
                                        <th scope="col">Amount</th>
                                        <th scope="col">Pay Day</th>
                                        <th scope="col"> </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <input type="hidden" name="account" id="account" value="TBD" />
                                        <input type="hidden" name="ie" id="ie" value="incomeBud" />
                                        <td><input type="text" className="cat" id="category" name="category"
                                            placeholder="Income Category" />
                                        </td>
                                        <td><b>$</b><input type="text" className="number" name="amount" id="amount"
                                            placeholder="0.00" />
                                        </td>
                                        <td><input type="text" className="number" name="date" id="date" placeholder="yyyy-mm-dd" /></td>
                                        <td><input type="button" id="in_add" value="+" /></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>


                        <div className="col-sm-auto">
                            <h2>Expenses</h2>
                            <table className="table table-striped" id="expenses">
                                <thead>
                                    <tr>
                                        <th scope="col">Type</th>
                                        <th scope="col">Budget</th>
                                        <th scope="col"> </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <input type="hidden" name="account" id="account" value="TBD" />
                                        <input type="hidden" name="ie" id="ie" value="expenseBud" />
                                        <td><input type="text" className="cat" id="category" name="category"
                                            placeholder="Expense Type" />
                                        </td>
                                        <td><b>$</b><input type="text" className="number" name="amount" id="amount"
                                            placeholder="0.00" />
                                        </td>
                                        <input type="hidden" name="date" id="date" value="{{ bud_day }}" />
                                        <td><input type="button" id="ex_add" value="+" /></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="col-md-auto">
                            <h2>Bills</h2>
                            <table className="table table-striped" id="bills">
                                <thead>
                                    <tr>
                                        <th scope="col">Bill</th>
                                        <th scope="col">Total</th>
                                        <th scope="col">Due Date</th>
                                        <th scope="col"> </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <input type="hidden" name="account" id="account" value="TBD" />
                                        <input type="hidden" id="ie" name="ie" value="billBud" />
                                        <td><input type="text" className="cat" id="category" name="category" placeholder="Bill Name" /></td>
                                        <td><b>$</b><input type="text" className="number" id="amount" name="amount"
                                            placeholder="0.00" />
                                        </td>
                                        <td><input type="text" className="number" id="date" placeholder="yyyy-mm-dd" name="date" /></td>
                                        <td><input type="button" id="bill_add" value="+" /></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <input type="submit" value="Submit" />
                </div>
            </form>
        </div >
    );
}
import { AuthContext } from "../context/auth-context";
import { useContext } from 'react';

export function Customize() {
    const { user } = useContext( AuthContext );

    function openForm() {

    }

    function closeForm() {

    }

    return (
        <div className="Customize">
            <h1>Customize Your Budget</h1>
            <button className="open-button" onClick={ () => openForm() }>New</button>
            <div className="form-popup" id="new">
                <form method="POST" action="/add" className="form-container">
                    <h1> Category</h1>
                    <label><b>Type</b></label>
                    <input type="hidden" name="ie" id="ie" value="incomeBud" />
                    <div className="form-check">
                        <input type="radio" name="type" id="income" value="Income" />
                        <label>Income</label>
                        <input type="radio" name="type" id="expense" value="Expense" />
                        <label>Expense</label>
                        <input type="radio" name="type" id="bill" value="Bill" />
                        <label>Bill</label>
                    </div>
                    <label><b>Name</b></label>
                    <input type="text" name="name" placeholder="Name Category" />
                    <button type="submit" className="btn">Add</button>
                    <button type="button" className="btn cancel" onClick={ () => closeForm() }>Close</button>

                    <div className="flex">
                        <div className="col">
                            <h2>Income</h2>
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">Type</th>
                                        <th scope="col">Amount</th>
                                        <th scope="col">Pay Day</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <input type="hidden" name="ie" id="ie" value="incomeBud" />
                                        <td>List of existing income categories</td>
                                        <td><b>$</b>List of existing income amounts<input type="text" className="number" name="amount" id="amount" value="{{ row[1] }}" />
                                        </td>
                                        <td>List of existing pay days<input type="text" className="number" name="date" id="date" value="{{ row[2] }}" /></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="col">
                            <h2>Expense</h2>
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">Type</th>
                                        <th scope="col">Budget</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <input type="hidden" name="ie" id="ie" value="expenseBud" />
                                        <td>List of existing expenses</td>
                                        <td><b>$</b>List of existing expense amounts <input type="text" className="number" name="amount" id="amount" value="{{ row[1] }}" />
                                        </td>
                                        <input type="hidden" name="date" id="date" value="{{ bud_day }}" />
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="col">
                            <h2>Bills</h2>
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">Bill</th>
                                        <th scope="col">Amount</th>
                                        <th scope="col">Due Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <input type="hidden" name="ie" id="ie" value="billBud" />
                                        <td>List of existing bills</td>
                                        <td> <b>$</b>List of existing bill amounts<input type="text" className="number" name="amount" id="amount" value="{{ row[1] }}" />
                                        </td>
                                        <td>List of existing bill due dates<input type="text" className="number" name="date" id="date" value="{{ row[2] }}" /></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <input type="submit" value="Submit" />
                </form>
            </div >
        </div>
    );
};;;;;;;;;;;;;;
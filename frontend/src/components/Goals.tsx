import { AuthContext } from "../context/auth-context";
import { useContext } from 'react';

export function Goals() {
    const { user } = useContext( AuthContext );

    return (
        <div className="Goals">
            <form id="transactions" method="POST" action="">

                <div className="container">
                    <div className="row justify-content-evenly">
                        <div className="col">

                            <h2>Expenses</h2>
                            <table id="expenses">
                                <tr>
                                    <input type="hidden" name="ie" id="ie" value="expense" />
                                    <select className="cat" id="category" name="category">
                                        <option>Account</option>
                                    </select>
                                    <select className="cat" id="category" name="category">
                                        <option>Expense Category</option>
                                    </select>
                                    $<input type="text" className="number" name="amount" id="amount" placeholder="0.00" />
                                    <input type="hidden" name="date" id="date" value="{{ bud_day }}" />
                                    <input type="text" className="cat" name="note" id="note" placeholder="Note" />
                                    <input type="button" id="ex_add" value="+" />
                                </tr>
                            </table>
                        </div>

                        <div className="col">
                            <h2>Expenses</h2>
                            <table id="expenses">
                                <tr>
                                    <input type="hidden" name="ie" id="ie" value="expense" />
                                    <select className="cat" id="category" name="category">
                                        <option>Account</option>
                                    </select>
                                    <select className="cat" id="category" name="category">
                                        <option>Expense Category</option>
                                    </select>
                                    $<input type="text" className="number" name="amount" id="amount" placeholder="0.00" />
                                    <input type="hidden" name="date" id="date" value="{{ bud_day }}" />
                                    <input type="text" className="cat" name="note" id="note" placeholder="Note" />
                                    <input type="button" id="ex_add" value="+" />
                                </tr>
                            </table>
                        </div>

                        <div className="col">
                            <h2>Expenses</h2>
                            <table id="expenses">
                                <tr>
                                    <input type="hidden" name="ie" id="ie" value="expense" />
                                    <select className="cat" id="category" name="category">
                                        <option>Account</option>
                                    </select>
                                    <select className="cat" id="category" name="category">
                                        <option>Expense Category</option>
                                    </select>
                                    $<input type="text" className="number" name="amount" id="amount" placeholder="0.00" />
                                    <input type="hidden" name="date" id="date" value="{{ bud_day }}" />
                                    <input type="text" className="cat" name="note" id="note" placeholder="Note" />
                                    <input type="button" id="ex_add" value="+" />
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};
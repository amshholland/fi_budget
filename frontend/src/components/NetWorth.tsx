import { AuthContext } from "../context/auth-context";
import { useContext } from 'react';

export function NetWorth() {
    const { user } = useContext( AuthContext );

    function addRow() {

    }

    function deleteRow() {

    }

    return (
        <div className="NetWorth">
            <h1>Debts, Savings, and Investments</h1>
            <div className="flex">
                <div className="col">

                    <h2>Debts</h2>
                    <table>
                        <thead>
                            <tr>
                                <th scope="col">Account</th>
                                <th scope="col">Amount</th>
                                <th scope="col">APR</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Debt Account</td>
                                <td> $Debt Amount</td>
                                <td> APR% </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="col">
                    <h2>Savings</h2>
                    <table>
                        <thead>
                            <tr>
                                <th scope="col">Account</th>
                                <th scope="col">Amount</th>
                                <th scope="col">APY</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td> Savings Account </td>
                                <td> $Savings Amount </td>
                                <td> APY% </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="col">
                    <table>
                        <h2>Investments</h2>
                        <thead>
                            <tr>
                                <th scope="col">Account</th>
                                <th scope="col">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td> Investment Account </td>
                                <td> $Investment Amount </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h2>Add Account</h2>
                <div>
        // Dynamically add and remove rows
                    <form id="form" name="form" action="" method="POST">
                        <div id="dsi_add">
                            <>
                                <select className="cat" id="dsi" name="dsi">
                                    <option>Type</option>
                                    <option>Debt</option>
                                    <option>Savings</option>
                                    <option>Investment</option>
                                </select>
                                <input type="text" className="cat" name="name" id="name" placeholder="Account Name" />
                                <b>$</b><input type="text" className="number" name="amount" id="amount" placeholder="0.00" />
                                <input type="text" className="number" name="rate" id="rate" placeholder=".000" /><b>%</b>
                                <input type="hidden" name="month" id="month" value="{{ month }}" />
                                <input type="button" id="add" value="+" />
                            </>
                        </div>
                        <input type="submit" value="Submit" />
                    </form >
                </div >

                {/* // < !--- linechart-- > */ }
                {/* Line Chart
                <script>
    // Load the Visualization API and the piechart package.
                    google.charts.load('current', { packages: ['corechart', 'line'] });
                    // Set a callback to run when the Google Visualization API is loaded.
                    google.charts.setOnLoadCallback(drawLogScales);

                    // Callback that creates and populates a data table,
                    // instantiates the pie chart, passes in the data and
                    // draws it.
                    function drawLogScales() {        // Create the data table.
        var data = new google.visualization.DataTable();
                    data.addColumn('date', 'Month');
                    data.addColumn('number', 'Debt');
                    data.addColumn('number', 'Savings');
                    data.addColumn('number', 'Investments');
                    data.addRows([
                    {% for month, debt, sav, inv in data %}
                    [new Date("{ { month } }"), parseFloat("{ { debt } }"), parseFloat("{ { sav } }"), parseFloat("{ { inv } }")],
                    {% endfor %}
                    ]);


                    // Set chart options
                    var options = {
                        title: 'Net Worth',
                    'width': 800,
                    'height': 600,
                    pointSize: 7,
                    pointShape: 'square',
                    hAxis: {
                        format: 'MMM yy',
                    title: 'Month'
        },
                    vAxis: {
                        format: '$###,###,###',
                    title: 'Amount'
        }
    };

                    // Format currency within chart
                    var formatter = new google.visualization.NumberFormat({ groupingSymbol: ',', prefix: '$' });
                    formatter.format(data, 1);
                    formatter.format(data, 2);
                    formatter.format(data, 3);

                    // Format dates within chart
                    var formatter_date = new google.visualization.DateFormat({ formatType: 'medium' });
                    formatter_date.format(data, 0);

                    // Instantiate and draw our chart, passing in some options.
                    var chart = new google.visualization.LineChart(document.getElementById('line_div'));
                    chart.draw(data, options);
    }

                </script> */}

                {/* <!--Div that will hold the bar chart-- > */ }
                {/* <div id="line_div" align="center"></div>; */ }
            </div >
        </div>
    );
}
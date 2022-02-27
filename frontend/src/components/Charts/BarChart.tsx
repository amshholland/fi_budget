import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { getBudgetCategoriesAndBudgetsForAccount } from "../../service/Budget";
import { getTransactionsByCategoryForAccount } from "../../service/Transaction";


export function BarChart() {
  const [ budgetData, setBudgetData ] = useState<Array<[ category: string, amount: number | string ]>>();
  const [ transactionData, setTransactionData ] = useState<Array<[ category: string, amount: number | string ]>>();

  const [ dataLoaded, setDataLoaded ] = useState<Boolean>( false );

  useEffect( () => {
    loadBudgetData();
    loadTransactionData();
  }, [] );

  function loadBudgetData() {
    getBudgetCategoriesAndBudgetsForAccount( "61be257c80c991270c8e8501" ).then( ( budget ) => {
      const temp: Array<[ category: string, amount: number | string ]> = [ [ "category", "amount" ] ];
      budget.forEach( ( item ) => {
        parseFloat( item.amount );
        temp.push( [ item.category, parseFloat( item.amount ) ] );
      } );
      setBudgetData( temp );
    } );
    setDataLoaded( true );
  }

  function loadTransactionData() {
    getTransactionsByCategoryForAccount( "61be257c80c991270c8e8501" ).then( ( category ) => {
      const temp: Array<[ category: string, sum: number | string ]> = [ [ "category", "Sum" ] ];
      category.forEach( ( item ) => {
        parseFloat( item.sum );
        temp.push( [ item.category, parseFloat( item.sum ) ] );
      } );
      setTransactionData( temp );
    } );
    setDataLoaded( true );
  }

  const diffdata = {
    old: budgetData,
    new: transactionData,
  };

  const options = {
    title: "Amount Spent Per Budget  ",
    legend: "none",
  };
  return (
    <div className="BarChart">
      <Chart
        chartType="BarChart"
        diffdata={ diffdata }
        options={ options }
        width="80%"
        height="400px"
      />
    </div>
  );
}
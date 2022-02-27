import { useContext, useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { AuthContext } from "../../context/auth-context";
import { getBudgetCategoriesAndBudgetsForAccount } from "../../service/Budget";


export function PieChart() {
  const { userFromDb } = useContext( AuthContext );
  const [ pieChartData, setPieChartData ] = useState<Array<[ category: string, amount: number | string ]>>();
  const [ dataLoaded, setDataLoaded ] = useState<Boolean>( false );

  useEffect( () => {
    loadBudgetData();
  }, [] );

  function loadBudgetData() {
    getBudgetCategoriesAndBudgetsForAccount( "61be257c80c991270c8e8501" ).then( ( budget ) => {
        const temp: Array<[ category: string, amount: number | string ]> = [ [ "category", "amount" ] ];
        setPieChartData( temp )
        budget.forEach( ( item ) => {
          parseFloat( item.amount );
          temp.push( [ item.category, parseFloat( item.amount ) ] );
        } );
        setPieChartData( temp );
      } );
    setDataLoaded( true );
  }


  const options = {
    title: "Month's Budgets",
    legend: "none"
  };

  return (
    <div className="PieChart" >
      <Chart
        chartType="PieChart"
        data={ pieChartData }
        options={ options }
        width="80%"
        height="400px"
      />
    </div >
  );
};
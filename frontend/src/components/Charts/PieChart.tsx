import { useContext, useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { AuthContext } from "../../context/auth-context";
import { getBudgetCategoriesAndBudgetsForAccount } from "../../service/Budget";


export function PieChart() {
  const { userFromDb } = useContext( AuthContext );
  const [ pieChartData, setPieChartData ] = useState<Array<[ category: string, amount: number | string ]>>();
  const [ dataLoaded, setDataLoaded ] = useState( false );

  useEffect( () => {
    loadBudgetData();
  }, [] );

  function loadBudgetData() {
    if ( userFromDb ) {
      getBudgetCategoriesAndBudgetsForAccount( userFromDb._id! ).then( ( budget ) => {
        const temp: Array<[ category: string, amount: number | string ]> = [ [ "category", "amount" ] ];
        setPieChartData( temp )
        budget.forEach( ( item ) => {
          parseFloat( item.amount );
          temp.push( [ item.category, parseFloat( item.amount ) ] );
        } );
        setPieChartData( temp );
      } );
      setDataLoaded( true );
    };
  }


  var options = {
    title: "Month's Budgets",
    legend: 'none'
  };

  return (
    <div className="PieChart" >
      { dataLoaded &&
        <Chart
          chartType="PieChart"
          data={ pieChartData }
          options={ options }
          width="80%"
          height="400px"
          legendToggle
        />
      }
    </div >
  );
};
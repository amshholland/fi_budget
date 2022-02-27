import { forEach } from "lodash";
import { useContext, useEffect, useState } from "react";
import { Chart, GoogleArrayToDataTable } from "react-google-charts";
import { AuthContext } from "../../context/auth-context";
import Budget from "../../model/budget";
import Transaction from "../../model/transaction";
import { getBudgetCategoriesAndBudgetsForAccount, getBudgetsForAccount } from "../../service/Budget";

// interface Props {
//   data: Budget[] | budget[];
//   options: any;
// }

export function PieChart() {
  const { userFromDb } = useContext( AuthContext );
  const [ categoriesAndAmounts, setCategoriesAndAmounts ] = useState<string[]>( [] );
  const [ pieChartData, setPieChartData ] = useState<string[][]>();
  const [ dataLoaded, setDataLoaded ] = useState( false );

  useEffect( () => {
    loadBudgetData();
  }, [] );

  function loadBudgetData() {
    if ( userFromDb ) {
      getBudgetCategoriesAndBudgetsForAccount( userFromDb._id! ).then( ( budget ) => {
        const temp = [ [ "category", "amount" ] ];
        budget.forEach( ( item ) => {
          temp.push( [ item.category, item.amount ] );
          console.log( temp );
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
import { BarChart } from './Charts/BarChart';
import { PieChart } from './Charts/PieChart';
import './Dashboard.css';

export function Dashboard() {

  return (
    <div className="Dashboard">
      <div className="month">
        <h1>Month</h1>
        <PieChart />
        <BarChart />
      </div>

      <div className="year">
        <h1>Year</h1>
      </div>
    </div>
  );
}
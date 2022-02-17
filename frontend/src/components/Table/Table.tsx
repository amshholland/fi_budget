import Budget from "../../model/budget";
import { TableHeader } from "./TableHeader";

interface Props {
  headerLabels: string[],
  rows: Budget[];
}
export function Table( { headerLabels, rows }: Props ) {
  return (
    <table>
      <TableHeader headerLabels={ headerLabels } />

    </table>
  );
}

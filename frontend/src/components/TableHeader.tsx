
export function TableHeader() {
  const columnLabels = [ "Type", "Category", "Amount", "Date", "Note" ];

  return (
    <thead>
      <tr>
        { columnLabels.map( ( column, index ) => (
          <th className="text-center" key={ index }>
            { column }
          </th>
        ) ) }
        <th />
      </tr>
    </thead>
  );
}
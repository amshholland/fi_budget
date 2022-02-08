interface Props {
  headerLabels: string[];
}

export function TableHeader( { headerLabels }: Props ) {
  return (
    <thead>
      <tr>
        { headerLabels.map( ( column, index ) => (
          <th className="text-center" key={ index }>
            { column }
          </th>
        ) ) }
      </tr>
    </thead>
  );
}
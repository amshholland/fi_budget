import { render, screen } from '@testing-library/react';

import { BudgetTable } from '../components/BudgetTable';
import { EditBudget } from '../components/Tables/EditingTable';

describe( "Budget Table", function () {
  render( <BudgetTable /> );
  test( 'should exist', () => {
    const budgetTable = screen.queryByTestId( /BudgetTable/i );
    expect( budgetTable ).toBeInTheDocument();
  } );
} );

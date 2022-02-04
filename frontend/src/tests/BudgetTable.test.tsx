import { render, screen } from '@testing-library/react';

import { AddToBudget } from '../components/AddToBudget';
import { BudgetTable } from '../components/BudgetTable';

describe( "Budget Table", function () {
  render( <BudgetTable /> );
  test( 'should exist', () => {
    const budgetTable = screen.queryByTestId( /BudgetTable/i );
    expect( budgetTable ).toBeInTheDocument();
  } );
} );

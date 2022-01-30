import { render, screen } from '@testing-library/react';

import { BudgetTable } from '../components/BudgetTable';
import { TableHeader } from '../components/TableHeader';

describe( 'Budget Table', () => {
  it( ' should exist', () => {
    render( <BudgetTable /> );
    expect( TableHeader ).toBeVisible();
  } );
  // it( 'should contain existing data if existing data', () => {

  // } );
} );
import { render, screen } from '@testing-library/react';

import App from './App';
import Header from './components/Header';
import React from 'react';

test( 'App renders logo link in header', () => {
  render(<App />);
  const logo = screen.getByRole( 'img', { name: /Financial Independence Logo/i } );
  expect( logo ).toBeInTheDocument();
} );
test( 'Header displays login button if not logged in', () => {
  render( <Header /> );
  const signInButton = screen.getByRole( 'button', { name: /Sign In/i } );
  expect( signInButton ).toBeInTheDocument();
} );

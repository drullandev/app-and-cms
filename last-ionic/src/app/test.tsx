import React from 'react';
import { render } from '@testing-library/react';
import AppComponent from './index';

test('renders without crashing', () => {
  const { baseElement } = render(<AppComponent />);
  expect(baseElement).toBeDefined();
});

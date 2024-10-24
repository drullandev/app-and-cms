import { render } from '@testing-library/react';
import AppComponent from './index';

it('renders without crashing', () => {
  const { asFragment, container } = render(<AppComponent />);
  expect(asFragment()).toMatchSnapshot();
});
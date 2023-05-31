import {render} from '@testing-library/react';
import NotFound from '../app/errors/NotFound'

test('renders not found page with an image and a text', () => {
  const { getByRole, getByText, getByAltText } = render(<NotFound />);
  const imageElement = getByAltText('hero');
  const textElement = getByText(/Page not Found/i);
  expect(imageElement).toBeInTheDocument();
  expect(textElement).toBeInTheDocument();
});

import { render, screen } from '@testing-library/react';
import EmptyBasket from '../app/errors/EmptyBasket'

describe('EmptyBasket', () => {
  test('renders empty basket message', () => {
    render(<EmptyBasket />);
    const emptyBasketText = screen.getByText('Your basket is Empty..!!!');
    expect(emptyBasketText).toBeInTheDocument();
  });
  test('renders empty basket image', () => {
    render(<EmptyBasket />);
    const emptyBasketImage = screen.getByAltText('hero');
    expect(emptyBasketImage).toBeInTheDocument();
    expect(emptyBasketImage).toHaveAttribute('src', '/images/Emptybasket.png');
  });
});

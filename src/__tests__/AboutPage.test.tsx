import { render } from '@testing-library/react'
import AboutPage from '../features/about/AboutPage'


test('renders heading', () => {
  const { getByText } = render(<AboutPage/>);
  const headingElement = getByText(/Who are we..!!/i);
  expect(headingElement).toBeInTheDocument();
});


test('renders mission statement', () => {
  const { getByText } = render(<AboutPage/>);
  const missionElement = getByText(/At STL retail, our mission is to provide quality and affordable products/i);
  expect(missionElement).toBeInTheDocument();
});


test('renders team information', () => {
  const { getByText } = render(<AboutPage/>);
  const teamElement = getByText(/Behind our company is a team of 500 talented individuals who are passionate about the Retail Industry/i);
  expect(teamElement).toBeInTheDocument();
});
import { render, screen } from '@testing-library/react';
import Sidebar from "../app/feed/components/sidebar";

it('Should havee All Items text', () => {
    render(<Sidebar />);
    const myElem = screen.getByText('All Items');
    expect(myElem).toBeInTheDocument();
});
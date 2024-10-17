import { render, screen } from '@testing-library/react';
import App from './App';

describe('Jest', () => {
  it('Should work', () => {
    expect(1).toBe(1);
  });

  it('Should display elements', () => {
    render(<App />);

    expect(
      screen.getByRole('heading', { name: /To Do List/i }),
    ).toBeInTheDocument();
  });
});

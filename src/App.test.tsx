import App from './App.tsx';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('App', () => {
  it('Render', async () => {
    render(<App />);

    await userEvent.click(screen.getByRole('button'));

    expect(screen.getByRole('button', { name: 'count is 1' })).toBeInTheDocument();
  });
});

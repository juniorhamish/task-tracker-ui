import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('App', () => {
  it('Render', async () => {
    render(<App onCountUpdated={vi.fn()} heading="Test" />);

    await userEvent.click(screen.getByRole('button'));

    expect(screen.getByRole('button', { name: 'count is 1' })).toBeInTheDocument();
  });
});

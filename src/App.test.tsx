import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import * as auth0 from '@auth0/auth0-react';
import App from './App';

vi.mock('@auth0/auth0-react');

describe('App', () => {
  beforeEach(() => {
    vi.mocked(auth0.useAuth0).mockReturnValue({
      loginWithPopup: vi.fn().mockRejectedValueOnce({}),
    } as unknown as auth0.Auth0ContextInterface);
  });
  afterEach(() => {
    vi.resetAllMocks();
  });
  it('Render', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: 'Login' }));

    expect(screen.queryByRole('button', { name: 'Login' })).toBeInTheDocument();
  });
});

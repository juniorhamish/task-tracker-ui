import { render, within } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import AppBar from './AppBar';
import { banner, bannerButton } from './AppBar.test.helpers';

describe('AppBar', () => {
  it('should display a Login button when not authenticated', () => {
    render(<AppBar isAuthenticated={false} onLogin={vi.fn()} onLogout={vi.fn()} />);

    expect(bannerButton('Login')).toBeVisible();
    expect(within(banner()).queryByRole('button', { name: 'Logout' })).not.toBeInTheDocument();
  });
  it('should display a Logout button when authenticated', () => {
    render(<AppBar isAuthenticated onLogin={vi.fn()} onLogout={vi.fn()} />);

    expect(bannerButton('Logout')).toBeVisible();
    expect(within(banner()).queryByRole('button', { name: 'Login' })).not.toBeInTheDocument();
  });
  it('should invoke the onLogin callback when the Login button is clicked', async () => {
    const onLogin = vi.fn();
    const user = userEvent.setup();
    render(<AppBar isAuthenticated={false} onLogin={onLogin} onLogout={vi.fn()} />);

    await user.click(bannerButton('Login'));

    expect(onLogin).toHaveBeenCalledOnce();
  });
  it('should invoke the onLogout callback when the Logout button is clicked', async () => {
    const onLogout = vi.fn();
    const user = userEvent.setup();
    render(<AppBar isAuthenticated onLogin={vi.fn()} onLogout={onLogout} />);

    await user.click(bannerButton('Logout'));

    expect(onLogout).toHaveBeenCalledOnce();
  });
});

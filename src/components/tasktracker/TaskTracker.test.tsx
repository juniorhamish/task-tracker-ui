import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import * as auth0 from '@auth0/auth0-react';
import { useAuth0 } from '@auth0/auth0-react';
import { userEvent } from '@testing-library/user-event';
import { bannerButton } from '../appbar/AppBar.test.helpers';
import TaskTracker from './TaskTracker';

vi.mock('@auth0/auth0-react');

describe('TaskTracker', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });
  it('should show a login button if not authenticated', () => {
    vi.mocked(auth0.useAuth0).mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
    } as unknown as auth0.Auth0ContextInterface);

    render(<TaskTracker />);

    expect(bannerButton('Login')).toBeVisible();
  });
  it('should show a logout button if user authenticated', () => {
    vi.mocked(auth0.useAuth0).mockReturnValue({
      isAuthenticated: true,
      isLoading: false,
      user: { email_verified: true },
    } as unknown as auth0.Auth0ContextInterface);

    render(<TaskTracker />);

    expect(bannerButton('Logout')).toBeVisible();
  });
  it('should show a message if user authenticated and email not verified', () => {
    vi.mocked(auth0.useAuth0).mockReturnValue({
      isAuthenticated: true,
      isLoading: false,
      user: { email_verified: false },
    } as unknown as auth0.Auth0ContextInterface);

    render(<TaskTracker />);

    expect(screen.getByText('Please verify your email address.')).toBeVisible();
  });
  it('should invoke the loginWithPopup flow when login is clicked', async () => {
    vi.mocked(auth0.useAuth0).mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
      loginWithPopup: vi.fn().mockResolvedValueOnce({}),
    } as unknown as auth0.Auth0ContextInterface);
    const { loginWithPopup } = useAuth0();
    render(<TaskTracker />);

    await userEvent.click(bannerButton('Login'));

    expect(loginWithPopup).toHaveBeenCalledOnce();
  });
  it('should show the Login button when loginWithPopup fails', async () => {
    vi.mocked(auth0.useAuth0).mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
      loginWithPopup: vi.fn().mockRejectedValueOnce({}),
    } as unknown as auth0.Auth0ContextInterface);
    render(<TaskTracker />);

    await userEvent.click(bannerButton('Login'));

    expect(bannerButton('Login')).toBeVisible();
  });
  it('should invoke the logout flow when Logout is clicked', async () => {
    vi.mocked(auth0.useAuth0).mockReturnValue({
      isAuthenticated: true,
      isLoading: false,
      logout: vi.fn().mockResolvedValueOnce({}),
      user: { email_verified: true },
    } as unknown as auth0.Auth0ContextInterface);
    const { logout } = useAuth0();
    render(<TaskTracker />);

    await userEvent.click(bannerButton('Logout'));

    expect(logout).toHaveBeenCalledOnce();
  });
  it('should display the Logout button if the logout flow fails', async () => {
    vi.mocked(auth0.useAuth0).mockReturnValue({
      isAuthenticated: true,
      isLoading: false,
      logout: vi.fn().mockRejectedValueOnce({}),
      user: { email_verified: true },
    } as unknown as auth0.Auth0ContextInterface);
    render(<TaskTracker />);

    await userEvent.click(bannerButton('Logout'));

    expect(bannerButton('Logout')).toBeVisible();
  });
});

import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import * as auth0 from '@auth0/auth0-react';
import { useAuth0 } from '@auth0/auth0-react';
import { userEvent } from '@testing-library/user-event';
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
  it('should show a login button if not authenticated', () => {
    vi.mocked(auth0.useAuth0).mockReturnValue({
      isAuthenticated: false,
    } as unknown as auth0.Auth0ContextInterface);

    render(<App />);

    expect(screen.getByRole('button', { name: 'Login' })).toBeVisible();
  });
  it('should show a logout button if user authenticated and email verified', () => {
    vi.mocked(auth0.useAuth0).mockReturnValue({
      isAuthenticated: true,
      user: { email_verified: true },
    } as unknown as auth0.Auth0ContextInterface);

    render(<App />);

    expect(screen.getByRole('button', { name: 'Logout' })).toBeVisible();
  });
  it('should show a message if user authenticated and email not verified', () => {
    vi.mocked(auth0.useAuth0).mockReturnValue({
      isAuthenticated: true,
      user: { email_verified: false },
    } as unknown as auth0.Auth0ContextInterface);

    render(<App />);

    expect(screen.getByText('Please verify your email address.')).toBeVisible();
  });
  it('should invoke the loginWithPopup flow when login is clicked', async () => {
    vi.mocked(auth0.useAuth0).mockReturnValue({
      isAuthenticated: false,
      loginWithPopup: vi.fn().mockRejectedValueOnce({}),
    } as unknown as auth0.Auth0ContextInterface);
    const { loginWithPopup } = useAuth0();
    render(<App />);

    await userEvent.click(screen.getByRole('button', { name: 'Login' }));

    expect(loginWithPopup).toHaveBeenCalledOnce();
  });
  it('should invoke the loginWithPopup flow when login is clicked temporary for coverage', async () => {
    vi.mocked(auth0.useAuth0).mockReturnValue({
      isAuthenticated: false,
      loginWithPopup: vi.fn().mockResolvedValueOnce({}),
    } as unknown as auth0.Auth0ContextInterface);
    const { loginWithPopup } = useAuth0();
    render(<App />);

    await userEvent.click(screen.getByRole('button', { name: 'Login' }));

    expect(loginWithPopup).toHaveBeenCalledOnce();
  });
  it('should invoke the logout flow when Logout is clicked', async () => {
    vi.mocked(auth0.useAuth0).mockReturnValue({
      isAuthenticated: true,
      logout: vi.fn().mockRejectedValueOnce({}),
      user: { email_verified: true },
    } as unknown as auth0.Auth0ContextInterface);
    const { logout } = useAuth0();
    render(<App />);

    await userEvent.click(screen.getByRole('button', { name: 'Logout' }));

    expect(logout).toHaveBeenCalledOnce();
  });
  it('should invoke the logout flow when Logout is clicked temporary for coverage', async () => {
    vi.mocked(auth0.useAuth0).mockReturnValue({
      isAuthenticated: true,
      logout: vi.fn().mockResolvedValueOnce({}),
      user: { email_verified: true },
    } as unknown as auth0.Auth0ContextInterface);
    const { logout } = useAuth0();
    render(<App />);

    await userEvent.click(screen.getByRole('button', { name: 'Logout' }));

    expect(logout).toHaveBeenCalledOnce();
  });
});

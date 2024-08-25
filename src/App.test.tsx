import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import * as auth0 from '@auth0/auth0-react';
import { useAuth0 } from '@auth0/auth0-react';
import { userEvent } from '@testing-library/user-event';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import mediaQuery from 'css-mediaquery';
import App from './App';
import { bannerButton } from './components/appbar/AppBar.test.helpers';

vi.mock('@auth0/auth0-react');

function createMatchMedia(scheme: string) {
  return (query: string) => ({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
    matches: mediaQuery.match(query, {
      'prefers-color-scheme': scheme,
    }),
    addListener: () => {},
    removeListener: () => {},
  });
}

describe('App', () => {
  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    window.matchMedia = createMatchMedia('light');
  });
  afterEach(() => {
    vi.resetAllMocks();
  });
  it('should show a login button if not authenticated', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    window.matchMedia = createMatchMedia('dark');
    vi.mocked(auth0.useAuth0).mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
    } as unknown as auth0.Auth0ContextInterface);

    render(<App />);

    expect(bannerButton('Login')).toBeVisible();
  });
  it('should show a logout button if user authenticated', () => {
    vi.mocked(auth0.useAuth0).mockReturnValue({
      isAuthenticated: true,
      isLoading: false,
      user: { email_verified: true },
    } as unknown as auth0.Auth0ContextInterface);

    render(<App />);

    expect(bannerButton('Logout')).toBeVisible();
  });
  it('should show a message if user authenticated and email not verified', () => {
    vi.mocked(auth0.useAuth0).mockReturnValue({
      isAuthenticated: true,
      isLoading: false,
      user: { email_verified: false },
    } as unknown as auth0.Auth0ContextInterface);

    render(<App />);

    expect(screen.getByText('Please verify your email address.')).toBeVisible();
  });
  it('should invoke the loginWithPopup flow when login is clicked', async () => {
    vi.mocked(auth0.useAuth0).mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
      loginWithPopup: vi.fn().mockResolvedValueOnce({}),
    } as unknown as auth0.Auth0ContextInterface);
    const { loginWithPopup } = useAuth0();
    render(<App />);

    await userEvent.click(bannerButton('Login'));

    expect(loginWithPopup).toHaveBeenCalledOnce();
  });
  it('should show the Login button when loginWithPopup fails', async () => {
    vi.mocked(auth0.useAuth0).mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
      loginWithPopup: vi.fn().mockRejectedValueOnce({}),
    } as unknown as auth0.Auth0ContextInterface);
    render(<App />);

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
    render(<App />);

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
    render(<App />);

    await userEvent.click(bannerButton('Logout'));

    expect(bannerButton('Logout')).toBeVisible();
  });
});

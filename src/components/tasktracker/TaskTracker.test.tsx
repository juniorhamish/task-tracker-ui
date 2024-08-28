import { render, screen, within } from '@testing-library/react';
import { expect, vi } from 'vitest';
import * as auth0 from '@auth0/auth0-react';
import { useAuth0 } from '@auth0/auth0-react';
import { userEvent } from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { ReactNode } from 'react';
import { banner, bannerButton } from '../topappbar/TopAppBar.test.helpers';
import TaskTracker from './TaskTracker';

vi.mock('@auth0/auth0-react');

const renderWithRouter = (children: ReactNode, route?: string) =>
  render(<MemoryRouter initialEntries={route ? [route] : undefined}>{children}</MemoryRouter>);
const mockAuth0 = (response: Partial<auth0.Auth0ContextInterface>) => {
  vi.mocked(auth0.useAuth0).mockReturnValue(response as auth0.Auth0ContextInterface);
};

describe('TaskTracker', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });
  it('should show a login button if not authenticated', () => {
    mockAuth0({
      isAuthenticated: false,
      isLoading: false,
    });

    renderWithRouter(<TaskTracker />);

    expect(bannerButton('Login')).toBeVisible();
  });
  it('should show the user avatar if user authenticated', () => {
    mockAuth0({
      isAuthenticated: true,
      isLoading: false,
      user: { email_verified: true, name: 'UserName', picture: 'https://foo.com' },
    });

    renderWithRouter(<TaskTracker />);

    expect(within(banner()).getByAltText('UserName')).toBeVisible();
  });
  it('should show a message if user authenticated and email not verified', () => {
    mockAuth0({
      isAuthenticated: true,
      isLoading: false,
      user: { email_verified: false },
    });

    renderWithRouter(<TaskTracker />);

    expect(screen.getByText('Please verify your email address.')).toBeVisible();
  });
  it('should invoke the loginWithPopup flow when login is clicked', async () => {
    mockAuth0({
      isAuthenticated: false,
      isLoading: false,
      loginWithPopup: vi.fn().mockResolvedValueOnce({}),
    });
    const { loginWithPopup } = useAuth0();
    renderWithRouter(<TaskTracker />);

    await userEvent.click(bannerButton('Login'));

    expect(loginWithPopup).toHaveBeenCalledOnce();
  });
  it('should show the Login button when loginWithPopup fails', async () => {
    mockAuth0({
      isAuthenticated: false,
      isLoading: false,
      loginWithPopup: vi.fn().mockRejectedValueOnce({}),
    });
    renderWithRouter(<TaskTracker />);

    await userEvent.click(bannerButton('Login'));

    expect(bannerButton('Login')).toBeVisible();
  });
  it('should invoke the logout flow when Logout is clicked', async () => {
    mockAuth0({
      isAuthenticated: true,
      isLoading: false,
      logout: vi.fn().mockResolvedValueOnce({}),
      user: { email_verified: true, name: 'UserName', picture: 'https://foo.com' },
    });
    const { logout } = useAuth0();
    renderWithRouter(<TaskTracker />);

    await userEvent.click(within(banner()).getByAltText('UserName'));
    await userEvent.click(screen.getByRole('menuitem', { name: 'Logout' }));

    expect(logout).toHaveBeenCalledOnce();
  });
  it('should remain authenticated if the logout flow fails', async () => {
    mockAuth0({
      isAuthenticated: true,
      isLoading: false,
      logout: vi.fn().mockRejectedValueOnce({}),
      user: { email_verified: true, name: 'UserName', picture: 'https://foo.com' },
    });
    renderWithRouter(<TaskTracker />);

    await userEvent.click(within(banner()).getByAltText('UserName'));
    await userEvent.click(screen.getByRole('menuitem', { name: 'Logout' }));

    expect(within(banner()).getByAltText('UserName')).toBeVisible();
  });
  it('should show a spinner while the login flow is in progress', () => {
    mockAuth0({
      isAuthenticated: false,
      isLoading: true,
    });
    renderWithRouter(<TaskTracker />);

    expect(screen.getByRole('progressbar')).toBeVisible();
  });
  it('should show the welcome screen if the user is not logged in', () => {
    mockAuth0({
      isAuthenticated: false,
      isLoading: false,
    });
    renderWithRouter(<TaskTracker />);

    expect(screen.getByRole('heading', { name: 'Welcome to Task Tracker' })).toBeVisible();
    expect(screen.getByText('Please log in or sign up!')).toBeVisible();
  });
  it('should show the authenticated screen if the user is logged in', () => {
    mockAuth0({
      isAuthenticated: true,
      isLoading: false,
      user: { email_verified: true, given_name: 'Dave' },
    });
    renderWithRouter(<TaskTracker />);

    expect(screen.getByText(/Dave/)).toBeVisible();
  });
  it('should show the welcome screen if an unauthenticated user navigates directly to the verify screen', () => {
    mockAuth0({
      isAuthenticated: false,
      isLoading: false,
    });
    renderWithRouter(<TaskTracker />, '/verify');

    expect(screen.getByRole('heading', { name: 'Welcome to Task Tracker' })).toBeVisible();
  });
  it('should show the authenticated screen if a verified user navigates directly to the verify screen', () => {
    mockAuth0({
      isAuthenticated: true,
      isLoading: false,
      user: { email_verified: true, given_name: 'Dave' },
    });
    renderWithRouter(<TaskTracker />, '/verify');

    expect(screen.getByText(/Dave/)).toBeVisible();
  });
  it('should show the welcome screen if an unauthenticated user navigates directly to the home screen', () => {
    mockAuth0({
      isAuthenticated: false,
      isLoading: false,
    });
    renderWithRouter(<TaskTracker />, '/home');

    expect(screen.getByRole('heading', { name: 'Welcome to Task Tracker' })).toBeVisible();
  });
  it('should show the verify screen if an unverified user navigates directly to the home screen', () => {
    mockAuth0({
      isAuthenticated: true,
      isLoading: false,
      user: { email_verified: false },
    });
    renderWithRouter(<TaskTracker />, '/home');

    expect(screen.getByText('Please verify your email address.')).toBeVisible();
  });
});

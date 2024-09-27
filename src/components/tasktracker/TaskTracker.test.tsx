import { render, screen, within } from '@testing-library/react';
import { expect, vi } from 'vitest';
import { Auth0ContextInterface, useAuth0 } from '@auth0/auth0-react';
import { userEvent } from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { ReactNode } from 'react';
import { banner, bannerButton } from '../topappbar/TopAppBar.test.helpers';
import TaskTracker from './TaskTracker';
import { UserInfo, UserInfoService } from '../../gen/client';
import { AxiosResponse } from 'axios';

vi.mock('@auth0/auth0-react');
vi.mock('../../gen/client/services.gen');

const renderWithRouter = (children: ReactNode, route?: string) =>
  render(<MemoryRouter initialEntries={route ? [route] : undefined}>{children}</MemoryRouter>);
const mockAuth0 = (response: Partial<Auth0ContextInterface>) => {
  vi.mocked(useAuth0).mockReturnValue({ ...response } as Auth0ContextInterface);
};
const mockUserInfo = (userInfo: Partial<UserInfo>) =>
  vi.mocked(UserInfoService.get).mockResolvedValueOnce({
    data: {
      firstName: userInfo.firstName ?? '',
      lastName: userInfo.lastName ?? '',
      email: userInfo.email ?? '',
      nickname: userInfo.nickname ?? '',
      picture: userInfo.picture ?? '',
    },
    status: 200,
  } as AxiosResponse<UserInfo>);

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
  it('should show the user avatar if user authenticated', async () => {
    mockUserInfo({ nickname: 'UserName', picture: 'https://foo.com' });
    mockAuth0({
      isAuthenticated: true,
      isLoading: false,
      user: { email_verified: true },
    });

    renderWithRouter(<TaskTracker />);

    expect(await within(banner()).findByRole('img', { name: 'UserName' })).toBeVisible();
  });
  it('should show a message if user authenticated and email not verified', async () => {
    mockAuth0({
      isAuthenticated: true,
      isLoading: false,
      user: { email_verified: false },
    });

    renderWithRouter(<TaskTracker />);

    expect(await screen.findByText('Please verify your email address.')).toBeVisible();
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
    mockUserInfo({ nickname: 'UserName', picture: 'https://foo.com' });
    mockAuth0({
      isAuthenticated: true,
      isLoading: false,
      logout: vi.fn().mockResolvedValueOnce({}),
      user: { email_verified: true },
    });
    const { logout } = useAuth0();
    renderWithRouter(<TaskTracker />);

    await userEvent.click(await within(banner()).findByRole('img', { name: 'UserName' }));
    await userEvent.click(screen.getByRole('menuitem', { name: 'Logout' }));

    expect(logout).toHaveBeenCalledOnce();
  });
  it('should remain authenticated if the logout flow fails', async () => {
    mockUserInfo({ picture: 'https://foo.com', nickname: 'UserName' });
    mockAuth0({
      isAuthenticated: true,
      isLoading: false,
      logout: vi.fn().mockRejectedValueOnce({}),
      user: { email_verified: true },
    });
    renderWithRouter(<TaskTracker />);

    await userEvent.click(await within(banner()).findByRole('img', { name: 'UserName' }));
    await userEvent.click(screen.getByRole('menuitem', { name: 'Logout' }));

    expect(await within(banner()).findByRole('img', { name: 'UserName' })).toBeVisible();
  });
  it('should show a spinner while the login flow is in progress', () => {
    mockAuth0({
      isAuthenticated: false,
      isLoading: true,
    });
    renderWithRouter(<TaskTracker />);

    expect(screen.getByRole('progressbar')).toBeVisible();
  });
  it('should show a spinner while the user info is fetched', async () => {
    vi.mocked(UserInfoService.get).mockReturnValue(new Promise<AxiosResponse<UserInfo>>(vi.fn()));
    mockAuth0({
      isAuthenticated: true,
      isLoading: false,
      user: { email_verified: true },
    });
    renderWithRouter(<TaskTracker />);

    expect(await screen.findByRole('progressbar')).toBeVisible();
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
  it('should show the authenticated screen if the user is logged in', async () => {
    mockUserInfo({ nickname: 'Dave' });
    mockAuth0({
      isAuthenticated: true,
      isLoading: false,
      user: { email_verified: true },
    });
    renderWithRouter(<TaskTracker />);

    expect(await screen.findByText(/Dave/)).toBeVisible();
  });
  it('should show the welcome screen if an unauthenticated user navigates directly to the verify screen', () => {
    mockAuth0({
      isAuthenticated: false,
      isLoading: false,
    });
    renderWithRouter(<TaskTracker />, '/verify');

    expect(screen.getByRole('heading', { name: 'Welcome to Task Tracker' })).toBeVisible();
  });
  it('should show the authenticated screen if a verified user navigates directly to the verify screen', async () => {
    mockUserInfo({ nickname: 'DJ' });
    mockAuth0({
      isAuthenticated: true,
      isLoading: false,
      user: { email_verified: true },
    });
    renderWithRouter(<TaskTracker />, '/verify');

    expect(await screen.findByText(/DJ/)).toBeVisible();
  });
  it('should show the welcome screen if an unauthenticated user navigates directly to the home screen', () => {
    mockAuth0({
      isAuthenticated: false,
      isLoading: false,
    });
    renderWithRouter(<TaskTracker />, '/home');

    expect(screen.getByRole('heading', { name: 'Welcome to Task Tracker' })).toBeVisible();
  });
  it('should show the verify screen if an unverified user navigates directly to the home screen', async () => {
    mockAuth0({
      isAuthenticated: true,
      isLoading: false,
      user: { email_verified: false },
    });
    renderWithRouter(<TaskTracker />, '/home');

    expect(await screen.findByText('Please verify your email address.')).toBeVisible();
  });
  it('should show the My Profile screen if the user is authenticated', async () => {
    mockUserInfo({});
    mockAuth0({
      isAuthenticated: true,
      isLoading: false,
      user: { email_verified: true },
    });
    renderWithRouter(<TaskTracker />, '/profile');

    expect(await screen.findByRole('heading', { name: 'My Profile' })).toBeVisible();
  });
  it('should show the Welcome screen if an unauthenticated user navigates directly to the profile screen', () => {
    mockAuth0({
      isAuthenticated: false,
      isLoading: false,
    });
    renderWithRouter(<TaskTracker />, '/profile');

    expect(screen.getByRole('heading', { name: 'Welcome to Task Tracker' })).toBeVisible();
  });
  it('should show the Verify screen if an unverified user navigates directly to the profile screen', async () => {
    mockAuth0({
      isAuthenticated: true,
      isLoading: false,
      user: { email_verified: false },
    });
    renderWithRouter(<TaskTracker />, '/profile');

    expect(await screen.findByText('Please verify your email address.')).toBeVisible();
  });
  it('should show the profile screen when My Profie menu item is selected', async () => {
    mockUserInfo({ nickname: 'Dave', picture: 'https://example.com' });
    mockAuth0({
      isAuthenticated: true,
      isLoading: false,
      user: { email_verified: true },
    });
    const user = userEvent.setup();
    renderWithRouter(<TaskTracker />);

    await user.click(await within(banner()).findByRole('img', { name: 'Dave' }));
    await user.click(screen.getByRole('menuitem', { name: 'My Profile' }));

    expect(await screen.findByRole('heading', { name: 'My Profile' })).toBeVisible();
  });
});

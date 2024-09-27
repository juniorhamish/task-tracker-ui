import { render, screen, within } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import TopAppBar from './TopAppBar';
import { banner, bannerButton } from './TopAppBar.test.helpers';
import { ReactNode } from 'react';
import { MemoryRouter } from 'react-router-dom';

const emptyUser = { firstName: '', lastName: '', email: '', nickname: '', picture: '', emailVerified: true };

const renderWithRouter = (children: ReactNode, route?: string) =>
  render(<MemoryRouter initialEntries={route ? [route] : undefined}>{children}</MemoryRouter>);

describe('TopAppBar', () => {
  it('should display a Login button when not authenticated', () => {
    renderWithRouter(<TopAppBar onLogin={vi.fn()} onLogout={vi.fn()} />);

    expect(bannerButton('Login')).toBeVisible();
  });
  it('should not display a Login button when authenticated', () => {
    renderWithRouter(<TopAppBar onLogin={vi.fn()} onLogout={vi.fn()} user={emptyUser} />);

    expect(within(banner()).queryByRole('button', { name: 'Login' })).not.toBeInTheDocument();
  });
  it('should display the user avatar when authenticated', () => {
    renderWithRouter(
      <TopAppBar
        onLogin={vi.fn()}
        onLogout={vi.fn()}
        user={{
          ...emptyUser,
          nickname: 'UserName',
          picture: 'https://gravatar.com/avatar/021aa0a2e9451a61bd130962c9bd36c00f2fb2be154ca5720bbe2089d4cf6053',
        }}
      />,
    );

    const avatar = within(banner()).getByRole('img', { name: 'UserName' });
    expect(avatar).toBeVisible();
    expect(avatar).toHaveAttribute(
      'src',
      'https://gravatar.com/avatar/021aa0a2e9451a61bd130962c9bd36c00f2fb2be154ca5720bbe2089d4cf6053',
    );
  });
  it('should display the My Profile menu item when the user is authenticated', async () => {
    const user = userEvent.setup();
    renderWithRouter(
      <TopAppBar
        onLogin={vi.fn()}
        onLogout={vi.fn()}
        user={{
          ...emptyUser,
          nickname: 'DJ',
          picture: 'https://gravatar.com/avatar/021aa0a2e9451a61bd130962c9bd36c00f2fb2be154ca5720bbe2089d4cf6053',
        }}
      />,
    );

    await user.click(within(banner()).getByRole('img', { name: 'DJ' }));

    expect(screen.getByRole('menuitem', { name: 'My Profile' })).toBeVisible();
  });
  it('should invoke the onLogin callback when the Login button is clicked', async () => {
    const onLogin = vi.fn();
    const user = userEvent.setup();
    renderWithRouter(<TopAppBar onLogin={onLogin} onLogout={vi.fn()} />);

    await user.click(bannerButton('Login'));

    expect(onLogin).toHaveBeenCalledWith();
  });
  it('should invoke the onLogout callback when the Logout button is clicked', async () => {
    const onLogout = vi.fn();
    const user = userEvent.setup();
    renderWithRouter(
      <TopAppBar
        onLogin={vi.fn()}
        onLogout={onLogout}
        user={{
          ...emptyUser,
          nickname: 'UserName',
          picture: 'https://gravatar.com/avatar/021aa0a2e9451a61bd130962c9bd36c00f2fb2be154ca5720bbe2089d4cf6053',
        }}
      />,
    );

    await user.click(within(banner()).getByRole('img', { name: 'UserName' }));
    await user.click(within(screen.getByRole('menu')).getByRole('menuitem', { name: 'Logout' }));

    expect(onLogout).toHaveBeenCalledWith();
  });
  it('should close the user menu when the Logout button is clicked', async () => {
    const user = userEvent.setup();
    renderWithRouter(
      <TopAppBar
        onLogin={vi.fn()}
        onLogout={vi.fn()}
        user={{
          ...emptyUser,
          nickname: 'UserName',
          picture: 'https://gravatar.com/avatar/021aa0a2e9451a61bd130962c9bd36c00f2fb2be154ca5720bbe2089d4cf6053',
        }}
      />,
    );

    await user.click(within(banner()).getByRole('img', { name: 'UserName' }));
    await user.click(within(screen.getByRole('menu')).getByRole('menuitem', { name: 'Logout' }));

    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });
  it('should close the user menu when the My Profile button is clicked', async () => {
    const user = userEvent.setup();
    renderWithRouter(
      <TopAppBar
        onLogin={vi.fn()}
        onLogout={vi.fn()}
        user={{
          ...emptyUser,
          nickname: 'UserName',
          picture: 'https://gravatar.com/avatar/021aa0a2e9451a61bd130962c9bd36c00f2fb2be154ca5720bbe2089d4cf6053',
        }}
      />,
    );

    await user.click(within(banner()).getByRole('img', { name: 'UserName' }));
    await user.click(within(screen.getByRole('menu')).getByRole('menuitem', { name: 'My Profile' }));

    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });
});

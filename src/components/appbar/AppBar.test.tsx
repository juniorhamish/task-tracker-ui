import { render, screen, within } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import AppBar from './AppBar';
import { banner, bannerButton } from './AppBar.test.helpers';

describe('AppBar', () => {
  it('should display a Login button when not authenticated', () => {
    render(<AppBar onLogin={vi.fn()} onLogout={vi.fn()} />);

    expect(bannerButton('Login')).toBeVisible();
  });
  it('should not display a Login button when authenticated', () => {
    render(<AppBar onLogin={vi.fn()} onLogout={vi.fn()} user={{}} />);

    expect(within(banner()).queryByRole('button', { name: 'Login' })).not.toBeInTheDocument();
  });
  it('should display the user avatar when authenticated', () => {
    render(
      <AppBar
        onLogin={vi.fn()}
        onLogout={vi.fn()}
        user={{ name: 'UserName', picture: 'https://gravatar.com/juniorhamish' }}
      />,
    );

    const avatar = within(banner()).getByAltText('UserName');
    expect(avatar).toBeVisible();
    expect(avatar).toHaveAttribute('src', 'https://gravatar.com/juniorhamish');
  });
  it('should invoke the onLogin callback when the Login button is clicked', async () => {
    const onLogin = vi.fn();
    const user = userEvent.setup();
    render(<AppBar onLogin={onLogin} onLogout={vi.fn()} />);

    await user.click(bannerButton('Login'));

    expect(onLogin).toHaveBeenCalledOnce();
  });
  it('should invoke the onLogout callback when the Logout button is clicked', async () => {
    const onLogout = vi.fn();
    const user = userEvent.setup();
    render(
      <AppBar
        onLogin={vi.fn()}
        onLogout={onLogout}
        user={{ name: 'UserName', picture: 'https://gravatar.com/juniorhamish' }}
      />,
    );

    await user.click(within(banner()).getByAltText('UserName'));
    await user.click(within(screen.getByRole('menu')).getByRole('menuitem', { name: 'Logout' }));

    expect(onLogout).toHaveBeenCalledOnce();
  });
});

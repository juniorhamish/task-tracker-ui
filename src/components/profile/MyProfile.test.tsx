import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import MyProfile from './MyProfile';

const userInfo = {
  firstName: '',
  lastName: '',
  nickname: '',
  email: '',
  picture: '',
  emailVerified: true,
};

describe('my profile', () => {
  it('should display the user avatar', () => {
    render(
      <MyProfile
        user={{
          ...userInfo,
          nickname: 'DJ',
          picture: 'https://gravatar.com/avatar/021aa0a2e9451a61bd130962c9bd36c00f2fb2be154ca5720bbe2089d4cf6053',
        }}
      />,
    );

    expect(screen.getByRole('img', { name: 'DJ' })).toHaveAttribute(
      'src',
      'https://gravatar.com/avatar/021aa0a2e9451a61bd130962c9bd36c00f2fb2be154ca5720bbe2089d4cf6053',
    );
  });
  it('should display the first name in a text field', async () => {
    const user = userEvent.setup();
    render(
      <MyProfile
        user={{
          ...userInfo,
          firstName: 'David',
        }}
      />,
    );
    const firstNameField = screen.getByLabelText('First name *');

    await user.type(firstNameField, 'Dave');

    expect(firstNameField).toHaveValue('Dave');
  });
  it('should display the last name in a text field', async () => {
    const user = userEvent.setup();
    render(
      <MyProfile
        user={{
          ...userInfo,
          lastName: 'Johnston',
        }}
      />,
    );
    const lastNameField = screen.getByLabelText('Last name *');

    await user.type(lastNameField, 'Smith');

    expect(lastNameField).toHaveValue('Smith');
  });
});

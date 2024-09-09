import type { Meta, StoryObj } from '@storybook/react';

import { fn } from '@storybook/test';
import TopAppBar from './TopAppBar';

const meta: Meta<typeof TopAppBar> = {
  component: TopAppBar,
  parameters: {
    deepControls: { enabled: true },
  },
};

export default meta;
type Story = StoryObj<typeof TopAppBar>;

export const LoggedOut: Story = {
  args: {
    onLogin: fn(),
    onLogout: fn(),
  },
  argTypes: {
    user: {
      control: false,
    },
  },
};

export const LoggedIn: Story = {
  args: {
    ...LoggedOut.args,
    user: {
      nickname: 'DJ',
      picture: 'https://gravatar.com/avatar/021aa0a2e9451a61bd130962c9bd36c00f2fb2be154ca5720bbe2089d4cf6053',
      emailVerified: true,
      email: '',
      firstName: '',
      lastName: '',
    },
  },
};

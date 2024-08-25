import type { Meta, StoryObj } from '@storybook/react';

import { fn } from '@storybook/test';
import AppBar from './AppBar';

const meta: Meta<typeof AppBar> = {
  component: AppBar,
  parameters: {
    deepControls: { enabled: true },
  },
};

export default meta;
type Story = StoryObj<typeof AppBar>;

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
      name: 'David Johnston',
      picture: 'https://gravatar.com/avatar/021aa0a2e9451a61bd130962c9bd36c00f2fb2be154ca5720bbe2089d4cf6053',
    },
  },
};

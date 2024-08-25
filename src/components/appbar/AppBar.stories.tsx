import type { Meta, StoryObj } from '@storybook/react';

import { fn } from '@storybook/test';
import AppBar from './AppBar';

const meta: Meta<typeof AppBar> = {
  component: AppBar,
  argTypes: {
    isAuthenticated: {
      control: {
        type: 'boolean',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof AppBar>;

export const Primary: Story = {
  args: {
    onLogin: fn(),
    onLogout: fn(),
    isAuthenticated: false,
  },
};

import type { Meta, StoryObj } from '@storybook/react';
import UnverifiedUser from './UnverifiedUser';

const meta: Meta<typeof UnverifiedUser> = {
  component: UnverifiedUser,
  args: {
    loggedIn: true,
    verified: false,
  },
};

export default meta;
type Story = StoryObj<typeof UnverifiedUser>;

export const Primary: Story = {};

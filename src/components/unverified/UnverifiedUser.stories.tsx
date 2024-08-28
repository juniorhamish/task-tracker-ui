import type { Meta, StoryObj } from '@storybook/react';
import UnverifiedUser from './UnverifiedUser';

const meta: Meta<typeof UnverifiedUser> = {
  component: UnverifiedUser,
  argTypes: {
    user: {
      control: false,
    },
  },
  args: {
    user: {},
  },
};

export default meta;
type Story = StoryObj<typeof UnverifiedUser>;

export const Primary: Story = {};

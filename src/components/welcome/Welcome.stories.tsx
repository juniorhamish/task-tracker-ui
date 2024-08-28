import type { Meta, StoryObj } from '@storybook/react';
import Welcome from './Welcome';

const meta: Meta<typeof Welcome> = {
  component: Welcome,
  argTypes: {
    user: {
      control: false,
    },
  },
};

export default meta;
type Story = StoryObj<typeof Welcome>;

export const Primary: Story = {};

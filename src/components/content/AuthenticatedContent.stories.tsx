import type { Meta, StoryObj } from '@storybook/react';
import AuthenticatedContent from './AuthenticatedContent';

const meta: Meta<typeof AuthenticatedContent> = {
  component: AuthenticatedContent,
};

export default meta;
type Story = StoryObj<typeof AuthenticatedContent>;

export const Primary: Story = {
  parameters: {
    deepControls: { enabled: true },
  },
  args: {
    user: {
      firstName: 'string',
      lastName: 'string',
      nickname: 'string',
      picture: 'string',
      email: 'string',
      emailVerified: true,
    },
  },
};

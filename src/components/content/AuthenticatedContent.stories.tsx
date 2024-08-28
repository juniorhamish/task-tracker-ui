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
      given_name: 'string',
      family_name: 'string',
      name: 'string',
      nickname: 'string',
      picture: 'string',
      email_verified: true,
    },
  },
};

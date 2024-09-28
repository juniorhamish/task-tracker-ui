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
      firstName: 'John',
      lastName: 'Doe',
      nickname: 'JD',
      picture: 'https://gravatar.com/avatar/021aa0a2e9451a61bd130962c9bd36c00f2fb2be154ca5720bbe2089d4cf6053',
      email: 'johndoe@email.com',
    },
  },
};

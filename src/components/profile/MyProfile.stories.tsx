import type { Meta, StoryObj } from '@storybook/react';
import MyProfile from './MyProfile';

const meta: Meta<typeof MyProfile> = {
  component: MyProfile,
  parameters: {
    deepControls: { enabled: true },
  },
};

export default meta;
type Story = StoryObj<typeof MyProfile>;

export const Primary: Story = {
  args: {
    user: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@doe.com',
      nickname: 'JD',
      picture: 'https://gravatar.com/avatar/021aa0a2e9451a61bd130962c9bd36c00f2fb2be154ca5720bbe2089d4cf6053',
      emailVerified: true,
    },
  },
};

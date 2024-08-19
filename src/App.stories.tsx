import type { Meta, StoryObj } from '@storybook/react';

import { fn } from '@storybook/test';
import App from './App';

const meta: Meta<typeof App> = {
  component: App,
};

export default meta;
type Story = StoryObj<typeof App>;

export const Primary: Story = {
  args: {
    heading: 'Vite + React',
    onCountUpdated: fn(),
  },
};

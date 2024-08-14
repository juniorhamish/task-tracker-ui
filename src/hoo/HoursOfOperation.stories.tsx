import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import HoursOfOperationEditor from './HoursOfOperationEditor';

const meta: Meta<typeof HoursOfOperationEditor> = {
  component: HoursOfOperationEditor,
};

export default meta;
type Story = StoryObj<typeof HoursOfOperationEditor>;

export const Primary: Story = {
  args: {
    hoursOfOperation: {
      monday: {
        start: '09:00',
        end: '17:00',
      },
    },
    onChange: fn(),
  },
};

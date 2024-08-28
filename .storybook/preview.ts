import type { Preview } from '@storybook/react';
import { withRouter } from 'storybook-addon-remix-react-router';

const preview: Preview = {
  decorators: [withRouter],
  parameters: {
    backgrounds: {
      values: [
        {
          name: 'twitter',
          value: '#00aced',
        },
        {
          name: 'facebook',
          value: '#3b5998',
        },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  tags: ['autodocs'],
};

export default preview;

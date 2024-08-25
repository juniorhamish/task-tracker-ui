import { screen, within } from '@testing-library/react';

export const banner = () => screen.getByRole('banner');
export const bannerButton = (name: string) => within(banner()).getByRole('button', { name });

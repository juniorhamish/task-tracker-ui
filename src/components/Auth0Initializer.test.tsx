import { UserInfoService } from '../gen/client';
import { Auth0ContextInterface, useAuth0 } from '@auth0/auth0-react';
import Auth0Initializer from './Auth0Initializer.tsx';
import { render } from '@testing-library/react';

vi.mock('@auth0/auth0-react');

describe('request headers', () => {
  it('should add the bearer token header', async () => {
    const getAccessTokenSilently = vi.fn();
    getAccessTokenSilently.mockResolvedValueOnce('Token');
    vi.mocked(useAuth0).mockReturnValue({ getAccessTokenSilently } as unknown as Auth0ContextInterface);
    render(<Auth0Initializer />);

    const result = await UserInfoService.get();

    expect(result.config?.headers.Authorization).toBe('Bearer Token');
  });
});

import { UserInfoService } from '../gen/client';
import { Auth0ContextInterface, useAuth0 } from '@auth0/auth0-react';
import Auth0Initializer from './Auth0Initializer.tsx';
import { render } from '@testing-library/react';

vi.mock('@auth0/auth0-react');

describe('request headers', () => {
  let getAccessTokenSilently: () => Promise<string>;
  beforeEach(() => {
    getAccessTokenSilently = vi.fn();
    vi.mocked(useAuth0).mockReturnValue({ getAccessTokenSilently } as unknown as Auth0ContextInterface);
  });
  afterEach(() => {
    vi.resetAllMocks();
  });
  it('should add the bearer token header', async () => {
    render(<Auth0Initializer />);
    vi.mocked(getAccessTokenSilently).mockResolvedValueOnce('Token');

    const result = await UserInfoService.get();

    expect(result.config?.headers.Authorization).toBe('Bearer Token');
  });
  it('should set the base URL', async () => {
    render(<Auth0Initializer />);

    const result = await UserInfoService.get();

    expect(result.config?.baseURL).toBe('/api');
  });
});

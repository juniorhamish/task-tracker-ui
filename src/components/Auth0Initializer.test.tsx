import { client, UserInfoService } from '../gen/client';
import { Auth0ContextInterface, useAuth0 } from '@auth0/auth0-react';
import Auth0Initializer from './Auth0Initializer.tsx';
import { render } from '@testing-library/react';

vi.mock('@auth0/auth0-react');

describe('request headers', () => {
  let getAccessTokenSilently: () => Promise<string>;
  let setRequestHeader: () => void;
  beforeEach(() => {
    getAccessTokenSilently = vi.fn();
    vi.mocked(useAuth0).mockReturnValue({ getAccessTokenSilently } as unknown as Auth0ContextInterface);
    setRequestHeader = vi.fn();
    const xhrMock: Partial<XMLHttpRequest> = {
      open: vi.fn(),
      send: Promise.resolve,
      setRequestHeader,
    };
    vi.spyOn(window, 'XMLHttpRequest').mockImplementation(() => xhrMock as XMLHttpRequest);
    vi.spyOn(client, 'setConfig');
  });
  afterEach(() => {
    vi.resetAllMocks();
  });
  it('should add the bearer token header', async () => {
    render(<Auth0Initializer />);
    vi.mocked(getAccessTokenSilently).mockResolvedValueOnce('Token');

    await UserInfoService.get();

    expect(setRequestHeader).toHaveBeenCalledWith('Authorization', 'Bearer Token');
  });
  it('should set the base URL', async () => {
    render(<Auth0Initializer />);

    await UserInfoService.get();

    expect(client.setConfig).toHaveBeenCalledWith({ baseURL: '/api' });
  });
});

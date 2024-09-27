import { client, UserInfoService } from '../gen/client';
import { Auth0ContextInterface, useAuth0 } from '@auth0/auth0-react';
import Auth0Initializer from './Auth0Initializer.tsx';
import { render } from '@testing-library/react';
import { log } from '../logging/Log.ts';

vi.mock('@auth0/auth0-react');

describe('request headers', () => {
  let getAccessTokenSilently: () => Promise<string>;
  let getAccessTokenWithPopup: () => Promise<string>;
  let setRequestHeader: () => void;
  beforeEach(() => {
    getAccessTokenSilently = vi.fn();
    getAccessTokenWithPopup = vi.fn();
    vi.mocked(useAuth0).mockReturnValue({
      getAccessTokenSilently,
      getAccessTokenWithPopup,
    } as unknown as Auth0ContextInterface);
    setRequestHeader = vi.fn();
    const doSend = () => Promise.resolve();
    const xhrMock: Partial<XMLHttpRequest> = {
      open: vi.fn(),
      send: void doSend(),
      setRequestHeader,
    };
    vi.spyOn(window, 'XMLHttpRequest').mockImplementation(() => xhrMock as XMLHttpRequest);
    vi.spyOn(client, 'setConfig');
    vi.spyOn(log, 'error');
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
  it('should use the popup if it fails to get the token silently', async () => {
    render(<Auth0Initializer />);
    const error = new Error('Failed to get token silently');
    vi.mocked(getAccessTokenSilently).mockRejectedValueOnce(error);
    vi.mocked(getAccessTokenWithPopup).mockResolvedValueOnce('Token From Popup');

    await UserInfoService.get();

    expect(setRequestHeader).toHaveBeenCalledWith('Authorization', 'Bearer Token From Popup');
    expect(log.error).toHaveBeenCalledWith('Failed to get token silently.', error);
  });
  it('should set the base URL', async () => {
    render(<Auth0Initializer />);

    await UserInfoService.get();

    expect(client.setConfig).toHaveBeenCalledWith({ baseURL: '/api' });
  });
});

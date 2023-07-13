import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import SpotifyAuthorization from '../spotify/SpotifyAuthorization';

describe('SpotifyAuthorization tests', () => {
  const spotifyAuthorization = new SpotifyAuthorization();
  const mock = new MockAdapter(axios);

  afterEach(() => {
    mock.reset();
  });

  test('refreshToken when HttpRequest succeeds redirect response', async () => {
    mock.onAny().reply(200, { access_token: 'token' });

    const result = await spotifyAuthorization.refreshToken();
    expect(result).toEqual(true);
  });

  test('refreshToken when HttpRequest fails redirect response', async () => {
    mock.onAny().reply(403, { error: {} });

    const result = await spotifyAuthorization.refreshToken();
    expect(result).toEqual(false);
  });

  test('refreshToken when HttpRequest throws exception return null', async () => {
    const exc = () => {
      throw new TypeError();
    };

    mock.onAny().reply(exc);

    const result = await spotifyAuthorization.refreshToken();
    expect(result).toEqual(false);
  });
});

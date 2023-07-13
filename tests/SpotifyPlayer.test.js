import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import SpotifyPlayer from '../spotify/SpotifyPlayer';

describe('SpotifyPlayer tests', () => {
  const spotifyPlayer = new SpotifyPlayer();
  const mock = new MockAdapter(axios);

  afterEach(() => {
    mock.reset();
  });

  test('playPlaylist when HttpRequest succeeds redirect response', async () => {
    mock.onAny().reply(200);
    expect.assertions(1);

    const result = await spotifyPlayer.playPlaylist('playlistUri');
    expect(result.status).toEqual(200);
  });

  test('playPlaylist when HttpRequest fails redirect response', async () => {
    mock.onAny().reply(403);
    expect.assertions(1);

    const result = await spotifyPlayer.playPlaylist();
    expect(result.status).toEqual(403);
  });

  test('playPlaylist when HttpRequest throws exception return null', async () => {
    const exc = () => {
      throw new TypeError();
    };

    mock.onAny().reply(exc);
    expect.assertions(1);

    const result = await spotifyPlayer.playPlaylist();
    expect(result).toBeNull();
  });

  test('pauseSong when HttpRequest succeeds redirect response', async () => {
    mock.onAny().reply(200);
    expect.assertions(1);

    const result = await spotifyPlayer.pauseSong();
    expect(result.status).toEqual(200);
  });

  test('pauseSong when HttpRequest fails redirect response', async () => {
    mock.onAny().reply(403);
    expect.assertions(1);

    const result = await spotifyPlayer.pauseSong();
    expect(result.status).toEqual(403);
  });

  test('pauseSong when HttpRequest throws exception return null', async () => {
    const exc = () => {
      throw new TypeError();
    };

    mock.onAny().reply(exc);
    expect.assertions(1);

    const result = await spotifyPlayer.pauseSong();
    expect(result).toBeNull();
  });

  test('nextSong when HttpRequest succeeds redirect response', async () => {
    mock.onAny().reply(200);
    expect.assertions(1);

    const result = await spotifyPlayer.nextSong();
    expect(result.status).toEqual(200);
  });

  test('nextSong when HttpRequest fails redirect response', async () => {
    mock.onAny().reply(403);
    expect.assertions(1);

    const result = await spotifyPlayer.nextSong();
    expect(result.status).toEqual(403);
  });

  test('nextSong when HttpRequest throws exception return null', async () => {
    const exc = () => {
      throw new TypeError();
    };

    mock.onAny().reply(exc);
    expect.assertions(1);

    const result = await spotifyPlayer.nextSong();
    expect(result).toBeNull();
  });

  test('previousSong when HttpRequest succeeds redirect response', async () => {
    mock.onAny().reply(200);
    expect.assertions(1);

    const result = await spotifyPlayer.previousSong();
    expect(result.status).toEqual(200);
  });

  test('previousSong when HttpRequest fails redirect response', async () => {
    mock.onAny().reply(403);
    expect.assertions(1);

    const result = await spotifyPlayer.previousSong();
    expect(result.status).toEqual(403);
  });

  test('previousSong when HttpRequest throws exception return null', async () => {
    const exc = () => {
      throw new TypeError();
    };

    mock.onAny().reply(exc);
    expect.assertions(1);

    const result = await spotifyPlayer.previousSong();
    expect(result).toBeNull();
  });

  test('shufflePlaylist when HttpRequest succeeds redirect response', async () => {
    mock.onAny().reply(200);
    expect.assertions(1);

    const result = await spotifyPlayer.shufflePlaylist();
    expect(result.status).toEqual(200);
  });

  test('shufflePlaylist when HttpRequest fails redirect response', async () => {
    mock.onAny().reply(403);
    expect.assertions(1);

    const result = await spotifyPlayer.shufflePlaylist();
    expect(result.status).toEqual(403);
  });

  test('shufflePlaylist when HttpRequest throws exception return null', async () => {
    const exc = () => {
      throw new TypeError();
    };

    mock.onAny().reply(exc);
    expect.assertions(1);

    const result = await spotifyPlayer.shufflePlaylist();
    expect(result).toBeNull();
  });

  test('setVolume when HttpRequest succeeds redirect response', async () => {
    mock.onAny().reply(200);
    expect.assertions(1);

    const result = await spotifyPlayer.setVolume(100);
    expect(result.status).toEqual(200);
  });

  test('setVolume when HttpRequest fails redirect response', async () => {
    mock.onAny().reply(403);
    expect.assertions(1);

    const result = await spotifyPlayer.setVolume(100);
    expect(result.status).toEqual(403);
  });

  test('setVolume when HttpRequest throws exception return null', async () => {
    const exc = () => {
      throw new TypeError();
    };

    mock.onAny().reply(exc);
    expect.assertions(1);

    const result = await spotifyPlayer.setVolume(100);
    expect(result).toBeNull();
  });
});

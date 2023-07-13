import { jest } from '@jest/globals';
import SpotifyController from '../controller/SpotifyController';
import SpotifyAuthorization from '../spotify/SpotifyAuthorization';
import SpotifyPlayer from '../spotify/SpotifyPlayer';

describe('SpotifyController - when successfull status code', () => {
  const spotifyController = new SpotifyController();
  const spotifyPlayer = new SpotifyPlayer();
  spotifyController.spotifyPlayer = spotifyPlayer;

  const data = { status: 200 };

  test('playPlaylist returns true', async () => {
    jest.spyOn(spotifyPlayer, 'playPlaylist').mockImplementation(async () => data);
    const result = await spotifyController.playPlaylist('URI');
    expect(result).toBe(true);
  });

  test('pauseSong returns true', async () => {
    jest.spyOn(spotifyPlayer, 'pauseSong').mockImplementation(async () => data);
    const result = await spotifyController.pauseSong();
    expect(result).toBe(true);
  });

  test('nextSong returns true', async () => {
    jest.spyOn(spotifyPlayer, 'nextSong').mockImplementation(async () => data);
    const result = await spotifyController.nextSong();
    expect(result).toBe(true);
  });

  test('previousSong returns true', async () => {
    jest.spyOn(spotifyPlayer, 'previousSong').mockImplementation(async () => data);
    const result = await spotifyController.previousSong();
    expect(result).toBe(true);
  });

  test('shufflePlaylist returns true', async () => {
    jest.spyOn(spotifyPlayer, 'shufflePlaylist').mockImplementation(async () => data);
    const result = await spotifyController.shufflePlaylist();
    expect(result).toBe(true);
  });

  test('setVolume returns true', async () => {
    jest.spyOn(spotifyPlayer, 'setVolume').mockImplementation(async () => data);
    const result = await spotifyController.setVolume();
    expect(result).toBe(true);
  });
});

describe('SpotifyController - when failed status code', () => {
  const spotifyController = new SpotifyController();
  const spotifyPlayer = new SpotifyPlayer();
  spotifyController.spotifyPlayer = spotifyPlayer;

  const data = {
    status: 403,
    statusText: 'not found',
  };

  test('playPlaylist returns false', async () => {
    jest.spyOn(spotifyPlayer, 'playPlaylist').mockImplementation(async () => data);
    const result = await spotifyController.playPlaylist();
    expect(result).toBe(false);
  });

  test('pauseSong returns false', async () => {
    jest.spyOn(spotifyPlayer, 'pauseSong').mockImplementation(async () => data);
    const result = await spotifyController.pauseSong();
    expect(result).toBe(false);
  });

  test('nextSong returns false', async () => {
    jest.spyOn(spotifyPlayer, 'nextSong').mockImplementation(async () => data);
    const result = await spotifyController.nextSong();
    expect(result).toBe(false);
  });

  test('previousSong returns false', async () => {
    jest.spyOn(spotifyPlayer, 'previousSong').mockImplementation(async () => data);
    const result = await spotifyController.previousSong();
    expect(result).toBe(false);
  });

  test('shufflePlaylist returns false', async () => {
    jest.spyOn(spotifyPlayer, 'shufflePlaylist').mockImplementation(async () => data);
    const result = await spotifyController.shufflePlaylist();
    expect(result).toBe(false);
  });

  test('setVolume returns false', async () => {
    jest.spyOn(spotifyPlayer, 'setVolume').mockImplementation(async () => data);
    const result = await spotifyController.setVolume();
    expect(result).toBe(false);
  });
});

describe('SpotifyController - when spotifyPlayer returns null', () => {
  const spotifyController = new SpotifyController();
  const spotifyPlayer = new SpotifyPlayer();
  spotifyController.spotifyPlayer = spotifyPlayer;

  const data = null;

  test('playPlaylist returns false', async () => {
    jest.spyOn(spotifyPlayer, 'playPlaylist').mockImplementation(async () => data);
    const result = await spotifyController.playPlaylist('https://open.spotify.com/track/6RIW588nB6iXKoZ2pKxGtX?si=3db0e0def48d4751');
    expect(result).toBe(false);
  });

  test('pauseSong returns false', async () => {
    jest.spyOn(spotifyPlayer, 'pauseSong').mockImplementation(async () => data);
    const result = await spotifyController.pauseSong();
    expect(result).toBe(false);
  });

  test('nextSong returns false', async () => {
    jest.spyOn(spotifyPlayer, 'nextSong').mockImplementation(async () => data);
    const result = await spotifyController.nextSong();
    expect(result).toBe(false);
  });

  test('previousSong returns false', async () => {
    jest.spyOn(spotifyPlayer, 'previousSong').mockImplementation(async () => data);
    const result = await spotifyController.previousSong();
    expect(result).toBe(false);
  });

  test('shufflePlaylist returns false', async () => {
    jest.spyOn(spotifyPlayer, 'shufflePlaylist').mockImplementation(async () => data);
    const result = await spotifyController.shufflePlaylist();
    expect(result).toBe(false);
  });

  test('setVolume returns false', async () => {
    jest.spyOn(spotifyPlayer, 'setVolume').mockImplementation(async () => data);
    const result = await spotifyController.setVolume();
    expect(result).toBe(false);
  });
});

describe('SpotifyController - when token is expired and refreshing fails', () => {
  const spotifyController = new SpotifyController();
  const spotifyPlayer = new SpotifyPlayer();
  const spotifyAuthorization = new SpotifyAuthorization();
  spotifyController.spotifyPlayer = spotifyPlayer;

  const data = {
    status: 401,
    data: { error: { message: 'The access token expired' } },
  };

  afterEach(() => {
    jest.spyOn(spotifyAuthorization, 'refreshToken').mockImplementation(async () => false);
  });

  test('playPlaylist returns false', async () => {
    jest.spyOn(spotifyPlayer, 'playPlaylist').mockImplementation(async () => data);
    const result = await spotifyController.playPlaylist();
    expect(result).toBe(false);
  });

  test('pauseSong returns false', async () => {
    jest.spyOn(spotifyPlayer, 'pauseSong').mockImplementation(async () => data);
    const result = await spotifyController.pauseSong();
    expect(result).toBe(false);
  });

  test('nextSong returns false', async () => {
    jest.spyOn(spotifyPlayer, 'nextSong').mockImplementation(async () => data);
    const result = await spotifyController.nextSong();
    expect(result).toBe(false);
  });

  test('previousSong returns false', async () => {
    jest.spyOn(spotifyPlayer, 'previousSong').mockImplementation(async () => data);
    const result = await spotifyController.previousSong();
    expect(result).toBe(false);
  });

  test('shufflePlaylist returns false', async () => {
    jest.spyOn(spotifyPlayer, 'shufflePlaylist').mockImplementation(async () => data);
    const result = await spotifyController.shufflePlaylist();
    expect(result).toBe(false);
  });
});

describe('SpotifyController - when token is expired and refreshing succeeds', () => {
  const spotifyController = new SpotifyController();
  const spotifyPlayer = new SpotifyPlayer();
  const spotifyAuthorization = new SpotifyAuthorization();
  spotifyController.spotifyPlayer = spotifyPlayer;

  const data = {
    status: 401,
    data: { error: { message: 'The access token expired' } },
  };

  afterEach(() => {
    jest.spyOn(spotifyAuthorization, 'refreshToken').mockImplementation(async () => true);
  });

  test('playPlaylist returns false', async () => {
    jest.spyOn(spotifyPlayer, 'playPlaylist').mockImplementation(async () => data);
    const result = await spotifyController.playPlaylist();
    expect(result).toBe(false);
  });

  test('pauseSong returns false', async () => {
    jest.spyOn(spotifyPlayer, 'pauseSong').mockImplementation(async () => data);
    const result = await spotifyController.pauseSong();
    expect(result).toBe(false);
  });

  test('nextSong returns false', async () => {
    jest.spyOn(spotifyPlayer, 'nextSong').mockImplementation(async () => data);
    const result = await spotifyController.nextSong();
    expect(result).toBe(false);
  });

  test('previousSong returns false', async () => {
    jest.spyOn(spotifyPlayer, 'previousSong').mockImplementation(async () => data);
    const result = await spotifyController.previousSong();
    expect(result).toBe(false);
  });

  test('shufflePlaylist returns false', async () => {
    jest.spyOn(spotifyPlayer, 'shufflePlaylist').mockImplementation(async () => data);
    const result = await spotifyController.shufflePlaylist();
    expect(result).toBe(false);
  });

  test('setVolume returns false', async () => {
    jest.spyOn(spotifyPlayer, 'setVolume').mockImplementation(async () => data);
    const result = await spotifyController.setVolume();
    expect(result).toBe(false);
  });
});

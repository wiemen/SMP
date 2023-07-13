import spotifyUri from 'spotify-uri';
import SpotifyPlayer from '../spotify/SpotifyPlayer';
import SpotifyAuthorization from '../spotify/SpotifyAuthorization';
import logger from '../logger';
import ConfigReaderWriter from '../config/ConfigReaderWriter';

export default class SpotifyController {
  constructor() {
    this.spotifyPlayer = new SpotifyPlayer();
    this.spotifyAuthorization = new SpotifyAuthorization();
    this.configReaderWriter = new ConfigReaderWriter();
  }

  /**
   * Logic to handle the Spotify player for playing a specific playlist, can also be used to resume.
   * @param {uri} playlistURI, URI for the spotify playlist,
   * if empty then current playlist will resume.
   * @returns a boolean, whether it went successfully.
   */
  async playPlaylist(playlistURI) {
    const uri = SpotifyController.URIParser(playlistURI);
    const result = await this.spotifyPlayer.playPlaylist(uri);
    const callback = this.spotifyPlayer.playPlaylist.bind(this.spotifyPlayer);
    const success = this.#resultHandler(result, callback, uri);

    // Only shuffle playlist when call succeeded and playlist is given
    if (playlistURI && success) {
      this.shufflePlaylist(this.configReaderWriter.settings.shufflePlaylist);
    }
    return success;
  }

  /**
   * Logic to handle the Spotify player for pausing a song.
   * @returns a boolean, whether it went successfully.
   */
  async pauseSong() {
    const result = await this.spotifyPlayer.pauseSong();
    const callback = this.spotifyPlayer.pauseSong.bind(this.spotifyPlayer);
    return this.#resultHandler(result, callback);
  }

  /**
   * Logic to handle the Spotify player for skipping a song.
   * @returns a boolean, whether it went successfully.
   */
  async nextSong() {
    const result = await this.spotifyPlayer.nextSong();
    const callback = this.spotifyPlayer.nextSong.bind(this.spotifyPlayer);
    return this.#resultHandler(result, callback);
  }

  /**
   * Logic to handle the Spotify player for going back to the previous song.
   * @returns a boolean, whether it went successfully.
   */
  async previousSong() {
    const result = await this.spotifyPlayer.previousSong();
    const callback = this.spotifyPlayer.previousSong.bind(this.spotifyPlayer);
    return this.#resultHandler(result, callback);
  }

  /**
   * Logic to handle the Spotify player to change the shuffle state of the current playlist.
   * @param {boolean} state - Toggle the shuffle on or off.
   * @returns a boolean, whether it went successfully.
   */
  async shufflePlaylist(state) {
    const result = await this.spotifyPlayer.shufflePlaylist(state);
    const callback = this.spotifyPlayer.shufflePlaylist.bind(this.spotifyPlayer);
    return this.#resultHandler(result, callback, state);
  }

  /**
   * Logic to handle the Spotify player to change the volume of the player.
   * @param {int} vol - Precentage on how high the volume should be.
   * @returns a boolean, whether it went successfully.
   */
  async setVolume(volume) {
    const result = await this.spotifyPlayer.setVolume(volume);
    const callback = this.spotifyPlayer.setVolume.bind(this.spotifyPlayer);
    return this.#resultHandler(result, callback, volume);
  }

  /**
   * Result handler retrieved from the SpotifyPlayer
   * @param {http response} result - Http response from the spotifyplayer.
   * @param {function} callback - Function to callback after token is refreshed
   * @param {string} param - Parameter for some of the callback functions, can be left empty
   * @returns true if the call returned an ok result.
   */
  async #resultHandler(result, callback, param) {
    if (result == null) {
      return false;
    }

    let response = result;
    // Token expired
    if (response.status === 401 && response.data.error.message === 'The access token expired') {
      if (await this.spotifyAuthorization.refreshToken()) {
        response = await callback(param);
      }
    }

    if (response.status < 300) {
      return true;
    }

    const message = response.data && response.data.error ? `${response.data.error.message}` : `${response.statusText}`;
    logger.error(`[file: SpotifyController, function: ${callback.name}] request failed exited with status code ${response.status} ${message}`);
    return false;
  }

  /**
   * Parser for spotify URI.
   * @param {string} uri - spotify uri to be parsed.
   * @returns Spotify URI, when empty return null.
   */
  static URIParser(uri) {
    if (!uri) {
      return uri;
    }

    try {
      return spotifyUri.formatURI(uri);
    } catch (error) {
      logger.error(`[file: SpotifyController, function: URIParser] ${error.message}`);
      return null;
    }
  }
}

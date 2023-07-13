import axios from 'axios';
import dotenv from 'dotenv';
import ConfigReaderWriter from '../config/ConfigReaderWriter';
import logger from '../logger';

export default class SpotifyPlayer {
  constructor() {
    // These variables should be retrieved from the config file.
    this.url = 'https://api.spotify.com/v1/me/player/';
    this.configReaderWriter = new ConfigReaderWriter();
    this.env = dotenv.config().parsed;
  }

  /**
   * Call to the Spotify player API to play a specific playlist.
   * @param {URI} playlistURI, URI for the spotify playlist,
   * if empty then current playlist will resume
   * @returns the statuscode, if unhandled exception is encoutered return null.
   */
  async playPlaylist(playlistURI) {
    try {
      return await axios.put(`${this.url}play/?device_id=${this.env.deviceId}`, this.#getBody(playlistURI), this.#getConfig());
    } catch (error) {
      return this.#errorHandler('playPlaylist', error);
    }
  }

  /**
   * Call to the Spotify player API to pause a song.
   * @returns the statuscode, if unhandled exception is encoutered return null.
   */
  async pauseSong() {
    try {
      return await axios.put(`${this.url}pause/?device_id=${this.env.deviceId}`, null, this.#getConfig());
    } catch (error) {
      return this.#errorHandler('pauseSong', error);
    }
  }

  /**
   * Call to the Spotify player API to skip a song.
   * @returns the statuscode, if unhandled exception is encoutered return null.
   */
  async nextSong() {
    try {
      return await axios.post(`${this.url}next/?device_id=${this.env.deviceId}`, null, this.#getConfig());
    } catch (error) {
      return this.#errorHandler('nextSong', error);
    }
  }

  /**
   * Call to the Spotify player Api to go back to the previous song.
   * @returns the statuscode, if unhandled exception is encoutered return null.
   */
  async previousSong() {
    try {
      return await axios.post(`${this.url}previous/?device_id=${this.env.deviceId}`, null, this.#getConfig());
    } catch (error) {
      return this.#errorHandler('previousSong', error);
    }
  }

  /**
   * Call to the Spotify player API to change the shuffle state of the current playlist.
   * @param {boolean} state - Toggle the shuffle on or off.
   * @returns the statuscode, if unhandled exception is encoutered return null,
   * If requested state is same as current state it returns status code 204
   */
  async shufflePlaylist(state) {
    try {
      return await axios.put(`${this.url}shuffle?state=${state}&device_id=${this.env.deviceId}`, null, this.#getConfig());
    } catch (error) {
      return this.#errorHandler('shufflePlaylist', error);
    }
  }

  /**
   * Call to the Spotify player API to change the volume on the player.
   * @param {int} volume - Precentage on how high the volume should be.
   * @returns the statuscode, if unhandled exception is encoutered return null.
   */
  async setVolume(volume) {
    try {
      return await axios.put(`${this.url}volume?volume_percent=${volume}&device_id=${this.env.deviceId}`, null, this.#getConfig());
    } catch (error) {
      return this.#errorHandler('shufflePlaylist', error);
    }
  }

  /**
   * Error handler for api calls.
   * @param {string} fn - string of the function name.
   * @param {error} error - thrown error.
   * @returns Api response if that does not exist return null.
   */
  #errorHandler(fn, error) {
    if (error.response) {
      return error.response;
    }
    logger.error(`[file: ${Object.getPrototypeOf(this).constructor.name}, function: ${fn}] exited with an exception - ${error}`);
    return null;
  }

  #getConfig() {
    this.configReaderWriter = new ConfigReaderWriter();
    return {
      headers: { Authorization: `Bearer ${this.configReaderWriter.configData.spotify.accessToken}` },
    };
  }

  /**
   * Helper to play a specific playlist and wether to start on a random position.
   * @param {URI} playlistURI - If this is null then just resume/play the current playlist
   * @returns Http request body
   */
  #getBody(playlistURI) {
    if (!playlistURI) {
      return null;
    }
    if (this.configReaderWriter.settings.shufflePlaylist) {
      return { context_uri: playlistURI };
    }
    return { context_uri: playlistURI, offset: { position: 0 } };
  }
}

import axios from 'axios';
import qs from 'qs';
import dotenv from 'dotenv';
import logger from '../logger';
import ConfigReaderWriter from '../config/ConfigReaderWriter';
import SpotifyPlayer from './SpotifyPlayer';

export default class SpotifyAuthorization {
  constructor() {
    this.url = 'https://accounts.spotify.com/api/token';
    this.configReaderWriter = new ConfigReaderWriter();
    this.env = dotenv.config().parsed;
    this.spotifyPlayer = new SpotifyPlayer();
  }

  /**
   * Call to the Spotify authorization API to refresh an access token and applies it in the config.
   * @returns A boolean whether call went successfully.
   */
  async refreshToken() {
    const headers = this.#getHeaders();
    const data = this.#getData();

    try {
      logger.info('Attempting to refresh token');
      const response = await axios.post(this.url, qs.stringify(data), headers);

      await this.configReaderWriter.writeAccessToken(response.data.access_token);
      return true;
    } catch (error) {
      const message = error.response ? `${error.response.status}, ${error.response.data.error}, ${error.response.data.error_description}` : error;

      logger.error(`[file: SpotifyAuthorization, function: refreshToken] exited with an exception - ${message}`);
      return false;
    }
  }

  #getData() {
    return {
      grant_type: 'refresh_token',
      refresh_token: this.env.refreshToken,
    };
  }

  #getHeaders() {
    return {
      headers: {
        Authorization: `Basic ${Buffer.from(`${this.env.clientId}:${this.env.clientSecret}`, 'utf-8').toString('base64')}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };
  }
}

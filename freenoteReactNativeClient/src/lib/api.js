import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';
import { pin } from './pin'

export class API {

  constructor({ serverBaseUrl }) {
    this._serverBaseUrl = serverBaseUrl;
  }

  async login({ email, password }) {
    const resp = await pin.post(this._serverBaseUrl + "/api/v1/auth/login", {
      email,
      password,
    })
    this._accessToken = resp.data.accessToken;
    this._accessTokenContent = jwtDecode(this._accessToken);
    this._refreshToken = resp.data.refreshToken;
    this._refreshTokenContent = jwtDecode(this._refreshToken);
    await AsyncStorage.setItem('access_token', this._accessToken);
    await AsyncStorage.setItem('refresh_token', this._refreshToken);
  }

  async signup({ firstname, lastname, email, password }) {
    const resp = await pin.post(this._serverBaseUrl + "/api/v1/auth/signup", {
      email,
      firstname,
      lastname,
      password,
    })
    return resp.data;
  }

  async logout() {
    await AsyncStorage.removeItem('access_token');
    await AsyncStorage.removeItem('refresh_token');
    this._accessToken = null;
    this._accessTokenContent = null;
    this._refreshToken = null;
    this._refreshTokenContent = null;
  }

  async getAllNotes() {
    await this._validateAccessToken();
    const resp = await pin.get(this._serverBaseUrl + "/api/v1/notes", {
      headers: {
        'Authorization': "Bearer " + this._accessToken,
      }
    });
    return resp.data;
  }

  async _loadTokens() {
    const accessToken = await AsyncStorage.getItem('access_token');
    /** @type {string} */
    this._accessToken = accessToken;
    if (this._accessToken) {
      this._accessTokenContent = jwtDecode(accessToken);
    }
    const refreshToken = await AsyncStorage.getItem('refresh_token');
    /** @type {string} */
    this._refreshToken = refreshToken;
    if (this._refreshToken) {
      this._refreshTokenContent = jwtDecode(refreshToken);
    }
  }

  async _renewToken() {
    const resp = await pin.post(this._serverBaseUrl + "/api/v1/auth/renew_token", {
      refreshToken: this._refreshToken
    })
    const accessToken = resp.data.accessToken;
    this._accessToken = accessToken;
    this._accessTokenContent = jwtDecode(accessToken);
  }

  async _validateAccessToken() {
    if (!this._accessToken || !this._refreshToken) {
      throw new Error('token mission');
    }
    if (this._accessTokenContent.exp > Date.now() / 1000) {
      console.log('expired')
      return;
    }
    await this._renewToken();
  }

  async _debug() {
    const accessLocal = await AsyncStorage.getItem('access_token');
    const refreshLocal = await AsyncStorage.getItem('refresh_token');
    console.log(JSON.stringify({
      accessToken: this._accessToken,
      refreshToken: this._refreshToken,
      accessContent: this._accessTokenContent,
      refreshContent: this._refreshTokenContent,
      accessLocal,
      refreshLocal
    }, null, 2))
  }

  async getUser() {
    await this._loadTokens();
    const refreshToken = this._refreshToken;
    if (!refreshToken) {
      return null;
    }
    return this._refreshTokenContent;
  }
}
import { API } from "./lib/api";
import config from './config.json'

export const client = new API({
  serverBaseUrl: config.serverBaseUrl
})
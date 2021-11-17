import { getEnv } from "../lib/utils";

export const config = {
  env: {
    port: getEnv('PORT', "8080"),
    nodeEnv: getEnv('NODE_ENV', "development"),
    client: getEnv('CLIENT', "sqlite3"),
    dbUri: getEnv('DB_URI', "db.sqlite"),
    secretKey: getEnv('SECRET_KEY', "secret_key"),
    accessTokenExpStr: getEnv('ACCESS_TOKEN_EXP_STR', "15min"),
    refreshTokenExpStr: getEnv('REFRESH_TOKEN_EXP_STR', "30d")
  },
}

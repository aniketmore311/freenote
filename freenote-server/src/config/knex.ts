import { config } from './config'
import Knex from 'knex'

export const knex = Knex({
  client: config.env.client,
  connection: config.env.dbUri,
  useNullAsDefault: true,
})


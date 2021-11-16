import { knex } from './knex'
import { Model } from 'objection'

Model.knex(knex)

export { Model };
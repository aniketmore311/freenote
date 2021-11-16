import 'make-promises-safe'
import { config } from "dotenv";
config()

import { knex } from "../config/knex";
knex.on('query', (data) => {
  console.log({ sql: data.sql })
});

(async () => {

  await knex.schema.dropTableIfExists('users');
  await knex.schema.dropTableIfExists('notes');
  await knex.schema.dropTableIfExists('refresh_tokens');
  await knex.schema.createTable('users', (table) => {
    table.increments('id').primary().notNullable();
    table.string('firstname').notNullable();
    table.string('lastname').notNullable();
    table.string('email').unique().notNullable();
    table.text('password').notNullable();
    table.enum('role', ['user', 'admin']).notNullable().defaultTo('user');
    table.text('verify_token').notNullable();
    table.timestamp('verify_token_exp').notNullable();
    table.boolean('is_verified').notNullable().defaultTo(false);
    table.boolean('is_forbidden').notNullable().defaultTo(false);
    table.boolean('is_deleted').notNullable().defaultTo(false);
    table.text('password_key_salt').notNullable();
    table.text('init_vector').notNullable();
    table.text('encrypted_user_key').notNullable();
    table.timestamps(true, true);

  })
  await knex.schema.createTable('notes', (table) => {
    table.increments('id').primary().notNullable();
    table.string('title').notNullable();
    table.text('content').notNullable();
    table.integer('user_id').notNullable();
    table.boolean('is_deleted').notNullable().defaultTo(false);
    table.timestamps(true, true);

    table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE');
  })
  await knex.destroy();

})()
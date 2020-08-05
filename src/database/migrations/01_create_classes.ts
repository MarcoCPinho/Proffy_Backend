import knex from 'knex';

export async function up(knex: knex) {
    return knex.schema.createTable('classes', table => {
        table.increments('id').primary();
        table.string('subject').notNullable();
        table.decimal('cost').notNullable();

        table.integer('user_id')
            .notNullable()
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE') /*altera todos os campos vinculados ao user_id*/
            .onDelete('CASCADE'); /*quando o usuario é deletado, apaga todos os dados que tenham vínculo com aquele user_id*/
    });
}

export async function down(knex: knex) {
    return knex.schema.dropTable('classes');
}
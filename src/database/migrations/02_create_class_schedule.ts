import knex from 'knex';

export async function up(knex: knex) {
    return knex.schema.createTable('class_schedule', table => {
        table.increments('id').primary();

        table.integer('week_day').notNullable(); /* 0 a 6 - domingo a sábado */
        table.integer('from').notNullable();
        table.integer('to').notNullable();

        table.integer('class_id')
            .notNullable()
            .references('id')
            .inTable('classes')
            .onUpdate('CASCADE') /*altera todos os campos vinculados ao user_id*/
            .onDelete('CASCADE'); /*quando o usuario é deletado, apaga todos os dados que tenham vínculo com aquele user_id*/
    });
}

export async function down(knex: knex) {
    return knex.schema.dropTable('class_schedule');
}
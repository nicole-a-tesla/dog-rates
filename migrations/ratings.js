exports.up = function(knex) {
  return knex.schema
})

exports.down = function(knex) {
  return knex.schema
    .dropTable('ratings')
}

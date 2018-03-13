exports.up = function(knex) {
  return knex.schema
    .createTable('dogs', function(table) {
      table.increments('id').primary()
      table.string('imageSource')
      table.unique('imageSource')
    }).createTable('ratings', function(table) {
      table.increments('id').primary()
      table.integer('score')
      table.string('user_id')
      table.integer('dog_id').references('dogs.id')
    })
}

exports.down = function(knex) {
  return knex.schema
    .dropTable('dogs')
    .dropTable('ratings')
}

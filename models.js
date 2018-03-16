const knexConfig = require('./knexfile')
const knex = require('knex') (knexConfig);
const bookshelf = require('bookshelf')(knex);

const Dog = bookshelf.Model.extend({
  tableName: 'dogs',
  ratings: function() {
    return this.hasMany(Rating)
  }
});

const findOrCreateDog = (imageUrl) => {
  return Dog.where('imageSource', imageUrl).fetch()
    .then((matchingDogs) => {
      if (matchingDogs === null) {
        const newDog = new Dog({
          imageSource: imageUrl 
        })
        return newDog.save()
          .then((saved) => {
            return saved.attributes
          })
      }
      else {
        return matchingDogs[0]
      }
    })
}

const Rating = bookshelf.Model.extend({
  tableName: 'rating'
});


module.exports = { Dog, Rating, findOrCreateDog }

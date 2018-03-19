const knexConfig = require('./knexfile')
const knex = require('knex') (knexConfig);
const bookshelf = require('bookshelf')(knex);

const Dog = bookshelf.Model.extend({
  tableName: 'dogs',
  ratings: function() {
    return this.hasMany(Rating)
  }
});

const findOrCreateDog = (imageSource) => {
  return Dog.where('imageSource', imageSource).fetch()
    .then((matchingDogs) => {
      if (matchingDogs === null) {
        const newDog = new Dog({imageSource: imageSource})
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
  tableName: 'ratings'
});

const updateOrCreateRating = (dogId, userId, score) => {
  return Rating.where({dog_id: dogId, user_id: userId}).fetch()
    .then((existing_rating) => {
      if (existing_rating) {
        return existing_rating.save({score: score})
        .then((rating) => rating.attributes)
      }
      else {
        let newRating = new Rating({
          user_id: userId,
          dog_id: dogId,
          score: score
        })
        return newRating.save()
        .then((rating) => rating.attributes)
      }
  })

}

module.exports = { Dog, Rating, findOrCreateDog, updateOrCreateRating }

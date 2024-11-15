require('dotenv').config();

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI).then(() => console.log('Connected!'));

const personSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    age: Number,
    favoriteFoods: [String]
  }
)

const Person = mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
  const newUser = new Person(
    {
      name: "new User",
      age: 13,
      favoriteFoods: ["Sushi"]
    }
  );
  
  newUser.save(function(err, data) {
    if (err) return console.error(err);
    done(null, data)
  });
};

// const arrayOfPeople = [
//   {
//     name: "Mark",
//     age: 21,
//     favoriteFoods: ["eggs"]
//   },
//   {
//     name: "Pele",
//     age: 54,
//     favoriteFoods: ["feijuca", "feijao"]
//   }
// ];

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(
    arrayOfPeople, function(err, data) {
      if (err) return console.error(err);
      done(null, data);
    }
  )
};

// const personName = "Pele"

const findPeopleByName = (personName, done) => {
  Person.find(
    {name: personName},
    function(err, data) {
      if (err) return console.error(err);
      done(null, data);
    }
  ).exec();
};

const findOneByFood = (food, done) => {
  Person.findOne(
    {favoriteFoods: food},
    function(err, data) {
      if (err) return console.error(err);
      done(null, data);
    }
  ).exec();
};

const findPersonById = (personId, done) => {
  Person.findById(
    personId,
    function(err, data) {
      if (err) return console.error(err);
      done(null, data);
    }
  ).exec();
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById(
    personId,
    function(err, data) {
      if (err) return console.error(err);
      data.favoriteFoods.push(foodToAdd);
      data.save(
        function(err, data) {
          if (err) return console.error(err);
          done(null, data);
        }
      );
    }
  ).exec();
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate(
    {name: personName},
    {age: ageToSet},
    {new: true},
    function(err, data) {
      if (err) return console.error(err);
      done(null, data);
    }
  ).exec();
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(
    personId,
    function(err, data) {
      if (err) return console.error(err);
      done(null, data);
    }
  )
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.remove(
    {name: nameToRemove},
    function(err, data) {
      if (err) return console.error(err);
      done(null, data);
    }
  )
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  Person.find(
    {favoriteFoods: foodToSearch}
  )
  .sort({ name: 1 }) // Ascending, by name
  .limit(2)
  .select({age: 0}) // Here 0 means false and thus hide name property; The opposite will happen with 1
  .exec(
    function(err, data) {
      if (err) return console.error(err);
      done(null, data);
    }
  );
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;

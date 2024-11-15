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

const arrayOfPeople = [
  {
    name: "Mark",
    age: 21,
    favoriteFoods: ["eggs"]
  },
  {
    name: "Pele",
    age: 54,
    favoriteFoods: ["feijuca", "feijao"]
  }
];

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(
    arrayOfPeople, function(err, data) {
      if (err) return console.error(err);
      done(null, data)
    }
  )
};

const findPeopleByName = (personName, done) => {
  done(null /*, data*/);
};

const findOneByFood = (food, done) => {
  done(null /*, data*/);
};

const findPersonById = (personId, done) => {
  done(null /*, data*/);
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  done(null /*, data*/);
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  done(null /*, data*/);
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
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

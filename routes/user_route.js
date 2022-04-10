const router = require('express').Router();
const {user,thought} = require("../models")

// routing the GET request
router.get('/', (req, res) => {
  // Get all users
  user.find({}).populate({path:"friends"}).populate({path:"thoughts"})
 
    .then(dbUsers => res.json(dbUsers))
    // incase of error
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


// routing the GET request by id --> also check if the id exists
router.get('/:id', (req, res) => {
  // find a single user by its `id`
  
  Tag.findOne({
    where: {
      id: req.params.id
    }
  }).populate({path:"friends"}).populate({path:"thoughts",populate:{path:"reactions"}})
    .then(dbUsers => {
      // if tag doesn't exist
      if (!dbUsers) {
        res.status(404).json({ message: 'Sorry, a user with this id was not found!'});
        return;
      }
      res.json(dbUsers);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// adding a new user
// routing the POST request
router.post('/', (req, res) => {
  // create a new user
  user.create({
    username: req.body.username, email: req.body.email
  })
    .then(dbUsers => res.json(dbUsers))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
  });
});

//updating user info
// routing the UPDATE request by id --> also check if the id exists
router.put('/:id', (req, res) => {
  // update a user's name by its `id` value
  user.findOneAndUpdate(req.body, {
    where: {
        id: req.params.id
    }
  })
    .then(dbUsers => {
      // if tag doesn't exist
        if (!dbUsers[0]) {
            res.status(404).json({ message: 'Sorry, user with this id was not found!'});
            return;
        }
        res.json(dbUsers);
  })
    .catch(err => {
        console.log(err); 
        res.status(500).json(err);
  });

});

// deleting a user
// routing the DELETE request by id --> also check if the id exists
router.delete('/:id', (req, res) => {
  // delete on user by its `id` value
  user.findOneAndDelete({
    where: {
        id: req.params.id
    }
  })
    .then(dbUsers => {
      // if user doesn't exist
        if (!dbUsers) {
            res.status(404).json({ message: 'Sorry, a user with this id was not found!'});
            return;
        }
        res.json(dbUsers);
  })
  // incase of error
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
  });
});


module.exports = router;
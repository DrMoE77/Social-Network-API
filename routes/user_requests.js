const router = require('express').Router();
const {user,thought} = require("../models")

const userRoutes ={
// Get all users
// routing the GET request
getUsers(req, res) {
  user.find({})
  .populate({path:"friends", select:"-__v"})
  .populate({path:"thoughts", select:"-__v"})
  .select('-__v')
  .then(dbUsers => res.json(dbUsers))
    // incase of error
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
  });
},


 // find a single user by its `id`
// routing the GET request by id --> also check if the id exists
getUserById({params},res) {  
  user.findOne({ _id: params.id })
  .populate({path:"friends", select: '-__v'})
  .populate({path:"thoughts",select: '-__v',populate:{path:"reactions"}})
  .select('-__v')   
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
},


// adding a new user
// routing the POST request
addUser( {body},res) {
  // create a new user
  user.create({
    username: req.body.username, email: req.body.email
  })
  .then(dbUsers => res.json(dbUsers))
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
  });
},


//updating user info
// routing the UPDATE request by id --> also check if the id exists
updateUser({params, body},res) {
  // update a user's name by its `id` value
  user.findOneAndUpdate(req.body, { _id: params.id })
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

},

// deleting a user
// routing the DELETE request by id --> also check if the id exists
deleteUser({params}, res) {
  // delete on user by its `id` value
  user.findOneAndDelete({_id: params.id })
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
},

// adding a friend to a user's list
addFriend({params},res) {
  user.findOneAndUpdate({ _id: params.userId },
   {$push:{friends:params.friendId}
  })
    .then(dbUsers => res.json(dbUsers))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
  });
},

// deleting a friend from a user's list
deleteFriend({params}, res) {
  user.findOneAndUpdate({ _id: params.userId },
   {$pull:{friends:params.friendId}
  })
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
},
}

module.exports = userRoutes;
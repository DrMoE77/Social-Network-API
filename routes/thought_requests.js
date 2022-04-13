const router = require('express').Router();
const {user,thought} = require("../models")

const thoughtRoutes = {
  // routing the GET request
getThoughts(req,res) {
  // Get all thoughts
  thought.find({}).populate({path:"reactions"})
    .then(dbThoughts => res.json(dbThoughts))
    // incase of error
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
},

// getting one thought by its id
// routing the GET request by id --> also check if the id exists
getThoughtById({params},res ){
  // find a single thought by its `id`
  
  thought.findOne({
    where: {
      id: req.params.id
    }
  }).populate({path:"reactions"})
    .then(dbUsers => {
      // if tag doesn't exist
      if (!dbThoughts) {
        res.status(404).json({ message: 'Sorry, a thought with this id was not found!'});
        return;
      }
      res.json(dbThoughts);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
},

// adding a new thought
// routing the POST request
addThought({body}, res) {
  // create a new thought
  thought.create({
    thoughtText:req.body.thoughtText,username: req.body.username })
    // To Do - adding this thought to a user id
    .then(dbThoughts => res.json(dbThoughts))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
  });
},

//updating thought info
// routing the UPDATE request by id --> also check if the id exists
updateThought({params, body}, res) {
  // update a thought  by its `id` value
  thought.findOneAndUpdate(req.body, {
    where: {
        id: req.params.id
    }
  })
    .then(dbThoughts => {
      // if thought doesn't exist
        if (!dbThoughts[0]) {
            res.status(404).json({ message: 'Sorry, thought with this id was not found!'});
            return;
        }
        res.json(dbThoughts);
  })
    .catch(err => {
        console.log(err); 
        res.status(500).json(err);
  });

},

// deleting a thought
// routing the DELETE request by id --> also check if the id exists
deleteThought({params},res) {
  // delete on user by its `id` value
  user.findOneAndDelete({
    where: {
        id: req.params.id
    }
  })
    .then(dbThoughts => {
      // if user doesn't exist
        if (!dbThoughts) {
            res.status(404).json({ message: 'Sorry, a thought not found!'});
            return;
        }
        res.json(dbThoughts);
  })
  // incase of error
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
  });
},

// adding a reaction to a thought
addReaction({params,body},res) {
  thought.findOneAndUpdate({id: req.params.id},
   {$push:{reactions:{reactionBody:body.reactionBody,username: body.username}}
  })
    .then(dbThoughts => res.json(dbThoughts))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
  });
},

// deleting a reaction from a thought
deleteReaction({params},res) {
  thought.findOneAndUpdate({_id: req.params.thoughtId},
   {$pull:{reactions:{id:params.reactionId}}
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
}
}

module.exports = router;
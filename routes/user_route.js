const router = require('express').Router();

// routing the GET request
router.get('/', (req, res) => {
  // Get all users
  user.getAll({
// Get all user data from DB
    
  })
    .then(dbTagData => res.json(dbTagData))
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
    },
    
  })
    .then(dbTagData => {
      // if tag doesn't exist
      if (!dbTagData) {
        res.status(404).json({ message: 'Sorry, a tag with this id was not found!'});
        return;
      }
      res.json(dbTagData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


// routing the POST request
router.post('/', (req, res) => {
  // create a new user
  Tag.create({
    tag_name: req.body.tag_name
  })
    .then(dbTagData => res.json(dbTagData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
  });
});


// routing the UPDATE request by id --> also check if the id exists
router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
        id: req.params.id
    }
  })
    .then(dbTagData => {
      // if tag doesn't exist
        if (!dbTagData[0]) {
            res.status(404).json({ message: 'Sorry, a tag with this id was not found!'});
            return;
        }
        res.json(dbTagData);
  })
    .catch(err => {
        console.log(err); 
        res.status(500).json(err);
  });

});


// routing the DELETE request by id --> also check if the id exists
router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
        id: req.params.id
    }
  })
    .then(dbTagData => {
      // if tag doesn't exist
        if (!dbTagData) {
            res.status(404).json({ message: 'Sorry, a tag with this id was not found!'});
            return;
        }
        res.json(dbTagData);
  })
  // incase of error
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
  });
});


module.exports = router;
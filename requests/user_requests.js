const { user, thought } = require('../models')

const userRoutes = {
    // getting all users
    getUsers(req, res) {
        user.find({})
        .populate({ path: 'thoughts', select: '-__v'})
        .populate({ path: 'friends', select: '-__v'})
        .select('-__v')
        .then(dbUsers => res.json(dbUsers))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
    },

    //getting one user by ID
    getUserById({ params }, res) {
        user.findOne({ _id: params.id })
        .populate({ path: 'friends', select: '-__v' })
        .populate({ path: 'thoughts', select: '-__v', populate: { path: 'reactions'}})
        .select('-__v')
        .then(dbUsers => {
            if (!dbUsers) {
                res.status(404).json({message: 'User with this ID not found!'});
                return;
            }
            res.json(dbUsers);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    // adding a new user
    addUser({ body }, res) {
        user.create({ username: body.username, email: body.email})
        .then(dbUsers => res.json(dbUsers))
        .catch(err => res.status(400).json(err));
    },

    // updating user info 
    updateUser({ params, body }, res) {
        user.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
        .then(dbUsers => {
            if (!dbUsers) {
                res.status(404).json({ message: 'User with this ID not found!' });
                return;
            }
            res.json(dbUsers);
        })
        .catch(err => res.status(400).json(err));
    },

    // deleting user
    deleteUser({ params }, res) {
        user.findOneAndDelete({ _id: params.id })
        .then(dbUsers => {
            if (!dbUsers) {
                res.status(404).json({ message: ' User with this ID not found!'});
                return;
            }
            // remove the user from any friends arrays
            user.updateMany(
                { _id : {$in: dbUsers.friends } },
                { $pull: { friends: params.id } }
            )
            .then(() => {
                thought.deleteMany({ username : dbUsers.username })
                .then(() => {
                    res.json({message: "User deleted! "});
                })
                .catch(err => res.status(400).json(err));
            })
            .catch(err => res.status(400).json(err));
        })
        .catch(err => res.status(400).json(err));
    },

    // adding a new friend to a user 
    addFriend({ params }, res) {
        user.findOneAndUpdate({ _id: params.userId}, { $push: { friends: params.friendId } }, { new: true, runValidators: true })
        .then(dbUsers => res.json(dbUsers))
        .catch(err => res.status(400).json(err))
    },

    // deleting a friend from the list 
    deleteFriend({ params }, res) {
        user.findOneAndUpdate({ _id: params.userId}, { $pull: { friends: params.friendId} })
        .then(dbUsers => {
            if (!dbUsers) {
                res.status(404).json({ message: ' User with this ID not found!' });
                return;
            }
            //finding and updating the freinds list by deleting that user
            user.findOneAndUpdate(
                { _id: params.friendId },
                { $pull: { friends: params.userId } },
                { new: true, runValidators: true }
            )
            .then(dbUsers2 => {
                if(!dbUsers2) {
                    res.status(404).json({ message: 'User with this ID not found! ' })
                    return;
                }
                res.json({message: 'User deleted! '});
            })
            .catch(err => res.json(err));
        })
        .catch(err => res.json(err));
    }
}


module.exports = userRoutes
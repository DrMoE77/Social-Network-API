const { thought, user } = require('../models')

const thoughtRoutes = {
    // getting all thoughts 
    getThoughts(req, res) {
        thought.find({})
        .populate({ path: 'reactions', select: '-__v' })
        .select('-__v')
        .then(dbThoughts => res.json(dbThoughts))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
    },

    // getting one thought by its ID
    getThoughtById({ params }, res) {
        thought.findOne({ _id: params.id })
        .populate({ path: 'reactions', select: '-__v' })
        .select('-__v')
        //incase the thought ID does not exist
        .then(dbThoughts => {
            if (!dbThoughts) {
                res.status(404).json({message: ' Thought with ID not found!'});
                return;
            }
            res.json(dbThoughts);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    // adding a thought
    addThought({ body }, res) {
        thought.create({ thoughtText: body.thoughtText, username: body.username })
        .then(({ _id }) => {return user.findOneAndUpdate({ _id: params.userId },{ $push: { thoughts: _id }},{ new: true, runValidators: true });})
        .then(dbThoughts => res.json(dbThoughts))
        .catch(err => res.status(400).json(err))
    },

    // updating thought info 
    updateThought({ params, body }, res) {
        thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
        .then(dbThoughts => {
            //incase the thought ID does not exist
            if (!dbThoughts) {
                res.status(404).json({ message: 'Thought with this ID not found ' });
                return;
            }
            res.json(dbThoughts);
        })
        .catch(err => res.status(400).json(err));
    },

    // delete thought 
    deleteThought({ params }, res) {
        thought.findOneAndDelete({ _id: params.id })
        .then(dbThoughts => {
            if (!dbThoughts) {
                res.status(404).json({ message: 'Thought with this ID not found  '});
                return;
            }
            user.findOneAndUpdate(
                { username: dbThoughts.username },
                { $pull: { thoughts: params.id } }
            )
            .then(() => {
                res.json({message: 'Thought deleted! '});
            })
            .catch(err => res.status(500).json(err));
        })
    },

    // add a reaction to thought
    addReaction({ params, body }, res) {
        thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: { reactionBody: body.reactionBody, username: body.username} } },
            { new: true, runValidators: true })
            .then(dbThoughts => {
                if (!dbThoughts) {
                    res.status(404).json({ message: 'Thought with this ID not found  ' });
                    return;
                }
                res.json(dbThoughts);
            })
            .catch(err => res.status(500).json(err));
    },

    // remove a reaction from thought
    deleteReaction({ params }, res) {
        thought.findOneAndUpdate({ _id: params.thoughtId}, { $pull: { reactions: { _id: params.reactionId} } }, { new: true})
        .then(dbThoughts => {
            if (!dbThoughts) {
                res.status(404).json({ message: ' Thought with this ID not found ' });
                return;
            }
            res.json({message: 'Reaction deleted!'});
        })
        .catch(err => res.status(500).json(err));
    }
}

module.exports = thoughtRoutes
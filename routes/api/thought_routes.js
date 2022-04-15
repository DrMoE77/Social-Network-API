const router = require('express').Router()
const { 
    getThoughts, 
    getThoughtById, 
    addThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction
} = require('../../requests/thought_requests')

router
.route('/')
.get(getThoughts)
.post(addThought)

router
.route('/:id')
.get(getThoughtById)
.put(updateThought)
.delete(deleteThought)

router
.route('/:thoughtId/reactions')
.post(addReaction)

router
.route('/:thoughtId/reactions/:reactionId')
.delete(deleteReaction)

module.exports = router
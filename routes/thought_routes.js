const router =require("express").Router()
const {getThoughts,getThoughtById,addThought, updateThought, deleteThought, addReaction, deleteReaction} 
= require("./thought_requests")

// routing request for thoughts
router.route("/").get(getThoughts).post(addThought)

// routing requests with id
router.route("/:id").get(getThoughtById).put(updateThought).delete(deleteThought)

router.route("/:thoughtId/reactions").post(addReaction)

// routing requests with reaction id
router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction)


module.exports = router
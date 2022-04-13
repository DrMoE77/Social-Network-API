const router =require("express").Router()
const {getUsers,getUserById,addUser, updateUser, deleteUser, addFriend, deleteFriend} 
= require("./user_requests")

// routing request for users
router.route("/").get(getUsers).post(addUser)

// routing requests with id
router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser)

// routing requests with user id
router.route("/:userId/friends/:friendId").post(addFriend).delete(deleteFriend)


module.exports = router
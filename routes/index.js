const router = require("express").Router()
const userReq =require("./user_requests")
const thoughtReq =require("./thought_requests")

router.use("/users",userReq)
router.use("/thoughts",thoughtReq)
module.exports = router
const express=require("express")
const { register, login, profile } = require("../controller/Usercontroller")
const auth = require("../middleware/auth")
const U_router=express.Router()

U_router.post("/register",register)
U_router.post("/login",login)
U_router.get("/profile",auth,profile)
module.exports=U_router
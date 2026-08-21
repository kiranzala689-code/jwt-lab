const Usermodel = require("../models/User");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields required"
            });
        }
        const existingUser = await Usermodel.findOne({ email })
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            })
        }
        const Hashpassword = await bcrypt.hash(password, 10);
        const user = await Usermodel.create({
            name,
            email,
            password: Hashpassword
        })
        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        })
    } catch (err) {
        res.status(500).json({
            message: "Server error",
            error: err.message
        })
    }
}

const login=async (req,res)=>{
    try{
        const {email,password}=req.body
        if(!email||!password){
            return res.status(400).json({
                message:"all fields required"       
            })
        }
        const user=await Usermodel.findOne({email})
        if (!user){
            return res.status(401).json({
                message:"invalid user or password"
            })
        }
        const isMatch=await bcrypt.compare(
            password,
            user.password
        )
        if(!isMatch){
            return res.status(401).json({
                message:"invalid email or password"
            })
        }
        const token=generateToken(user.id)
        res.status(200).json({
            message:"login successfully",
            token,
            user:{
                id:user.id,
                name:user.name,
                email:user.email
            }
        })
    }catch(err){
        res.status(500).json({
            message:"Server error",
            error:err.message
        })
    }
   
}
const profile=async (req,res)=>{
    try{
        const user=await Usermodel.findById(req.userId).select("-password")
        if(!user){
            return res.status(404).json({
                message:"user not found"
            })
        }
        res.status(202).json({
            message:'profile fetched successfully',
            user
        })

    }catch(err){
        res.status(500).json({
            message:"server error",
            err:err.message
        })
    }
}

module.exports = { register,login,profile}
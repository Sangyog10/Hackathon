const User=require('../model/userModel')
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const register=async(req,res)=>{
    const { name, age, number, address, gender, password } = req.body;
    if(!name || !number || !password){
        throw new CustomError.BadRequestError("Enter all credentials")
    }
    const user=await User.create(req.body)
    res.status(StatusCodes.OK).json({msg:"User registered Successfully"})
}


const login=async(req,res)=>{}




module.exports={register,login}


// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
// const { StatusCodes } = require('http-status-codes');
// const CustomError = require('../errors');
// const User = require('../model/userModel');

// const register = async (req, res) => {
//   const { name, age, number, address, gender, password } = req.body;
//   if (!password) {
//     throw new CustomError.BadRequestError('Please provide all credentials');
//   }

//   try {
//     // const hashedPassword = await bcrypt.hash(password, 10);

//     const user = await User.create({
//       name,
//       age,
//       number,
//       address,
//       gender,
//       password: hashedPassword,
//     });

//     res.status(StatusCodes.OK).json({ msg: 'User registered successfully' });
//   } catch (error) {
//     console.error(error);
//     throw new CustomError.InternalServerError('Error registering user');
//   }
// };

// const login = async (req, res) => {
//   // Implementation for login goes here
// };

// module.exports = { register, login };

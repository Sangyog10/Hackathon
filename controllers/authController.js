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


const login=async(req,res)=>{
    const { number, password } = req.body;
    if (!number || !password) {
      throw new CustomError.BadRequestError("Enter both number and password");
    }
    const user = await User.findOne({ number });
    if (!user) {
      throw new CustomError.UnauthenticatedError("No user with given Number found");
    }
  
    const isPassword = await user.comparePassword(password);
    if (!isPassword) {
      throw new CustomError.UnauthenticatedError("Invalid password");
    }
    
    res.status(StatusCodes.CREATED).json({msg:"Logged in successfull", role:user.role, userId:user._id,name:user.name,points:user.points });
}




module.exports={register,login}

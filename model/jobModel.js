const mongoose=require('mongoose')

const JobSchema=new mongoose.Schema({
    title:{
        type:String
    },
    description:{
        type:String
    },
    date:{
        // type:Date
        type:String
    },
    latitude:{
        type:String
    },
    longitude:{
        type:String
    },
    createdBy:{
     type:mongoose.Types.ObjectId,
     ref:'User'
    },
   
    verified:{
        type:Boolean,
        default:false
    }
},{timestamps:true})

module.exports=mongoose.model('Job',JobSchema)
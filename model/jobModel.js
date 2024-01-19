const mongoose=require('mongoose')

const JobSchema=new mongoose.Schema({
    title:{
        type:String
    },
    description:{
        type:String
    },
    date:{
        type:Date
    },
    location:{
        type:String
    },
    role:{
       type:String,
       enum:['admin','user'],
       default:'user'
    },
    verified:{
        type:Boolean,
        default:false
    }
},{timestamps:true})

module.exports=mongoose.model('Job',JobSchema)
const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')

const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please enter username']
    },
    age:{
        type:String,
    },
    number:{
        type:String,
        required:[true,'Please enter number']
    },
    address:{
        type:String,
    },
    gender:{
        type:String,
        enum:['Male','Female']
    },
    password:{
        type:String,
        required:[true,'Please enter password']
    }
})

UserSchema.pre("save", async function () {
    if (!this.isModified("password")) return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  });

UserSchema.methods.comparePassword = async function (candidatePassword) {
    const isMatch = bcrypt.compare(candidatePassword, this.password);
    return isMatch;
};

module.exports=mongoose.model('User',UserSchema)
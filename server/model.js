const mongoose=require('mongoose')
let newUserSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    confirmPassword:{
        type:String,
        required:true,
    }
})

module.exports=mongoose.model('RegisteredUser', newUserSchema);

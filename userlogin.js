const mongoose=require("mongoose");
const userSchema=mongoose.Schema({
    email:{type:String,unique:true},
    email:{type:String,unique:true},
    password:{type:String,required:true},
    created_at:{type:Date,default:Date.now}
})

module.exports=mongoose.model("userlogin",userSchema);


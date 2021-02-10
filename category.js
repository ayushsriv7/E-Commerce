const mongoose=require("mongoose");
const catSchema=mongoose.Schema({
    category:{type:String,unique:true},
    image:{type:String,required:true},
    created_at:{type:Date,default:Date.now}
})

module.exports=mongoose.model("category",catSchema);


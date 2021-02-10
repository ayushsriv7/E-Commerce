const mongoose=require("mongoose");
const proSchema=mongoose.Schema({
    cname:{type:String,required:true},
    pname:{type:String,unique:true},
    price:{type:Number,required:true},
    quantity:{type:Number,required:true},
    feature:{type:String,required:true},
    image:{type:String,required:true},
    created_at:{type:Date,default:Date.now}
})

module.exports=mongoose.model("product",proSchema);


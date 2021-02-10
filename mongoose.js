const express=require('express');
const mongoose=require('mongoose');
const PORT=7788;
const app=express();
mongoose.connect("mongodb://localhost/databasename",{ useNewUrlParser: true,useUnifiedTopology: true },(err)=>
{
    if(err)
    {
        console.log("Not Connected");
    }
    else{
        console.log("Connection Established");
    }
    //define schema
   let empSchema=new mongoose.Schema(
       {
           name:{type:String,required:true},
           email:{type:String,required:true},
           salary:{type:Number,required:true},
           city:{type:String, required:true},
           created_at:{type:Date,default:Date.now}
       }
   ) 
   let empModel=mongoose.model("employee",empSchema);
   app.get("/insertData",(req,res)=>
   {
       //insert data
       let ins=new empModel({name:'Ayush',email:'srivastava.ayush180@gmail.com',salary:45000,city:'Varanasi',});
       ins.save(err=>
           {
               if(err)
               {
                   res.send("Already Registered");
               }
               else{
                   res.send("Registered Successfully");
               }
           })
})

})
app.get("/getData",(req,res)=>
{
    empModel.find({},(err,data)=>
    {
        if(err){res.send("something wrong")}
              else
        {res.send(data)};
    
  })
})
app.listen(PORT,()=>
{
    console.log(`Work on ${PORT}`);
})
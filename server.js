const express=require('express');
const cors=require('cors');
const mongoose=require("mongoose");
const fs=require('fs');
const sha1=require("sha1");//encrypt password in 40 digits,for security purpose
const multer=require('multer');//multer file upload
let DIR="./upload";
let storage=multer.diskStorage({
    destination: function(req,file,cb) {
        cb(null,DIR)
    },
    filename: function(req,file,cb) {
        cb(null,file.fieldname + '-' + Date.now()+ '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
    }
})
let upload = multer({ storage: storage}).single('attach');
mongoose.connect("mongodb://localhost/newProject",{ useNewUrlParser: true,useUnifiedTopology: true },(err)=>
{
    if(err)
    {
        console.log("Not Connected");
    }
    else{
        console.log("Connection Established");
    }
})
const bodyParser=require('body-parser');
const PORT=6677;
const app=express();
app.use(cors());//use of middleware to accept request
app.use(bodyParser.json());//for parsing app/json
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static("upload"));//serve static files
//load all database model
let adminModel=require("./database/adminlogin");
let catModel=require("./database/category");
let proModel=require("./database/product");
let userModel=require("./database/userlogin");

//route define
app.post("/adminlogin",(req,res)=>
{
    let email=req.body.email;
    let password=sha1(req.body.password);
    adminModel.findOne({email:email,password:password},(err,data)=>
    {
        if(err)
        {
            res.json({'err':1,'msg':'something went wrong'});
        }
        else if(data==null)
        {
            res.json({'err':1, 'msg':'Email and password is not correct'});
        }
        else
        {
            res.json({'err':0, 'msg':'Login Successfull','uid':email});
        }
    })
    //res.json({msg:password});
    //res.json({'msg':'api work'+ email+" "+password});
   // let ins=new adminModel({email:email,password:password});
    //ins.save(err=>
   // {
     //   if(err){res.json({'msg':'Not inserted'})}
       // else{
         //   res.json({'msg':'inserted'})
       // }
    //})
})
app.post("/changepassword",(req,res)=>
{
    let op=sha1(req.body.op);
    let np=sha1(req.body.np);
    let uid=req.body.uid;
    //find the password of user then com with op
    adminModel.findOne({email:uid},(err,data)=>
    {
        if(err)
        {
            res.json({"err":1,"msg":"Something went wrong"})
        }
        else{
               if(op===data.password)
               {
                   if(op===np)
                   {
                    res.json({"err":1,"msg":"Old Password and New Password should not be same"})
                   }
                   else{
                       adminModel.updateOne({email:uid},{$set:{password:np}},(err)=>
                       {
                         if(err){res.json({'err':1,"msg":"Something went wrong"})}
                         else  {
                             res.json({'err':0,
                            "msg":"Password Changed Successfully"})
                         }
                       })

                   }
               }
               else{
                res.json({"err":1,"msg":"Old Password is not Correct"})  
               } 
        }
    })
})
app.post("/addcategory",(req,res)=>
{
    upload(req,res,(err)=>{
        if(err)
        {
            res.json({"err":1,"msg":"uploading error"})
        }
        else{
            let cname=req.body.cname;
            let fname=req.file.filename;
            let ins=new catModel({category:cname,image:fname});
            ins.save(err=>
                {
                    if(err){
                        fs.unlink(`upload/${fname}`,(err)=>
                        {
                            if(err){}
                            else{
                                res.json({"err":1,"msg":"Category Already exists"})
                            }
                        })
                       
                    }
                    else{
                        res.json({"err":0,"msg":"category added"})
                    }
                })
        }
    })
})
app.get("/getcategory/:cid?",(req,res)=>
{
    let cid=req.params.cid;
    if(cid===undefined)
    {
    catModel.find({},(err,data)=>
    {
        if(err){
            res.json({"err":1,"msg":"Something Went Wrong"})
        }
        else{
            res.json({'err':0, 'cdata':data});
        }
    })
}
else{
    catModel.findOne({_id:cid},(err,data)=>
    {
        if(err){
            res.json({"err":1,"msg":"Something Went Wrong"})
        }
        else{
            res.json({'err':0, 'cdata':data});
        }
    })
}
})
app.get("/delcategory/:cid/:cimage",(req,res)=>
{
    let cid=req.params.cid;
    let cimage=req.params.cimage;
    catModel.deleteOne({_id:cid},(err)=>
    {
        if(err)
        {
            res.json({'err':1,'msg':'Something wrong'})
        }
        else{
            fs.unlink(`upload/${cimage}`,(err)=>
            {
                if(err)
                {
                    
                }
                else{
                    res.json({'err':0,'msg':'Category Deleted'});
                }
            })
        }
    })
})
app.post("/editCategorywithimage",(req,res)=>
{
    upload(req,res,(err)=>
    {
        if(err){}
        else
        {
            let cname=req.body.cname;
            let cid=req.body.cid;
            let fname=req.file.filename;
            catModel.updateOne({_id:cid},{$set:{category:cname,image:fname}},(err)=>
    {
        if(err){}
        else{
            res.json({'err':0,'msg':'Category Updated'})
        }
    })
        }
    })
})
app.post("/editCategorywithoutimage",(req,res)=>
{
    let cname=req.body.cname;
    let cid=req.body.cid;
    catModel.updateOne({_id:cid},{$set:{category:cname}},(err)=>
    {
        if(err){}
        else{
            res.json({'err':0,'msg':'Category Updated'})
        }
    })
})
//Products

app.post("/addproduct",(req,res)=>
{
    upload(req,res,(err)=>{
        if(err)
        {
            res.json({"err":1,"msg":"uploading error"})
        }
        else{
          let pname=req.body.pname;
            let cname=req.body.cname;
            let price=req.body.price;
            let quantity=req.body.quantity;
            let feature=req.body.feature;
            let fname=req.file.filename;
            console.log(req.body);
            let ins=new proModel({pname:pname,cname:cname,price:price,quantity:quantity,feature:feature,image:fname});
            ins.save(err=>
                {
                    if(err){
                        fs.unlink(`upload/${fname}`,(err)=>
                        {
                            if(err){}
                            else{
                                res.json({"err":1,"msg":"Product Already exists"})
                            }
                        })
                       
                    }
                    else{
                        res.json({"err":0,"msg":"product added"})
                    }
                })
        }
    })
})

app.get("/getproduct/:pid?",(req,res)=>
{
    let pid=req.params.cid;
    if(pid===undefined)
    {
    proModel.find({},(err,data)=>
    {
        if(err){
            res.json({"err":1,"msg":"Something Went Wrong"})
        }
        else{
            res.json({'err':0, 'pdata':data});
        }
    })
}
else{
    proModel.findOne({_id:pid},(err,data)=>
    {
        if(err){
            res.json({"err":1,"msg":"Something Went Wrong"})
        }
        else{
            res.json({'err':0, 'pdata':data});
        }
    })
}
})
app.get("/getproduct/:cname?",(req,res)=>
{
    let cname=req.params.cname;
    if(cname===undefined)
    {
    proModel.find({},(err,data)=>
    {
        if(err){
            res.json({"err":1,"msg":"Something Went Wrong"})
        }
        else{
            res.json({'err':0, 'pdata':data});
        }
    })
}
else{}
})
app.get("/delproduct/:pid/:pimage",(req,res)=>
{
    let pid=req.params.pid;
    let pimage=req.params.pimage;
    proModel.deleteOne({_id:pid},(err)=>
    {
        if(err)
        {
            res.json({'err':1,'msg':'Something wrong'})
        }
        else{
            fs.unlink(`upload/${pimage}`,(err)=>
            {
                if(err)
                {
                    
                }
                else{
                    res.json({'err':0,'msg':'Product Deleted'});
                }
            })
        }
    })
})
app.post("/editProductwithimage",(req,res)=>
{
    upload(req,res,(err)=>
    {
        if(err){}
        else
        {
            let pname=req.body.pname;
            let pid=req.body.pid;
            let fname=req.file.filename;
            proModel.updateOne({_id:pid},{$set:{product:pname,image:fname}},(err)=>
    {
        if(err){}
        else{
            res.json({'err':0,'msg':'Product Updated'})
        }
    })
        }
    })
})
app.post("/editProductwithoutimage",(req,res)=>
{
    let pname=req.body.pname;
    let pid=req.body.pid;
    proModel.updateOne({_id:pid},{$set:{product:cname}},(err)=>
    {
        if(err){}
        else{
            res.json({'err':0,'msg':'Product Updated'})
        }
    })
})
app.post("/regisuser",(req,res)=>
{
    let email=req.body.email;
    let name=req.body.name;
    let password=sha1(req.body.password);
    let ins= new userModel({email:email,password:password,name:name});
    ins.save(err=>
        {
            if(err)
            {
                res.json({'err':1,'msg':'Already Registered'});
            }
            else
            {
                res.json({'err':0,'msg':'User Registered'});
            }
        })
})
app.post("/loginuser",(req,res)=>
{
    let email=req.body.email;
      let password=sha1(req.body.password);
    userModel.findOne({email:email,password:password},(err,data)=>
    {
        if(err)
        {
            res.json({'err':1,'msg':'Something Went Wrong'})
        }
        else if(data===null)
        {
            res.json({'err':1,'msg':'Email and Password Not correct'})
        }
        else
        {
            res.json({'err':0,'msg':'Login Successfull','uid':email});
        }

    })
    
})
app.listen(PORT,()=>
{
    console.log(`Work on ${PORT}`);
})
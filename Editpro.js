import React, { Component } from 'react'
import Header from './Header';
import Sidebar from './Sidebar';
import{getProByid,getCat, editProWithImage, editProWithoutImage} from '../services/Myser';
import{URL} from '../config/path';
export class Editpro extends Component {
    state={cdata:[],cname:'',price:'',quantity:'',feature:'',pname:'',imageUrl:'',imagePath:'',errMsg:''}
    componentDidMount()
    {   //read params
        let pid=this.props.match.params.pid;
        getProByid(pid)
        .then(res=>
            {
                if(res.data.err==0)
                {
                    this.setState({pname:res.data.pdata.pname,cname:res.data.pdata.cname,price:res.data.pdata.price,quantity:res.data.pdata.quantity,feature:res.data.pdata.feature})
                    this.setState({imageUrl:res.data.pdata.image})
                }
            })
            getCat()
            .then(res=>{
                if(res.data.err==0){
                    this.setState({cdata:res.data.cdata})
                }
            })
    }
    handler=(event)=>
    {
        //this.setState({pname:event.target.value});
        event.preventDefault();
        const {name,value}=event.target
        this.setState({[name]:value});
    }
    attach=(event)=>
    {
        if(event.target.files.length>0)
        {
            this.setState({imagePath:event.target.files[0]})
        }
    }
    editpro=(event)=>
    {
        event.preventDefault();
        console.log(this.state);
        if(this.state.imagePath=="")
        {
            let formData={pname:this.state.pname,pid:this.props.match.params.pid,cname:this.state.cname,price:this.state.price,quantity:this.state.quantity,feature:this.state.feature};
            editProWithoutImage(formData)
            .then(res=>
                {
                    if(res.data.err==0)
                    {
                        alert(res.data.msg);
                        this.props.history.push("/dashboard/product");
                    }
                    if(res.data.err==1)
                    {  
                        alert(res.data.msg);
                    }
                
                })
        }
        else
        {
            if(this.state.imagePath.type==="image/jpg" || this.state.imagePath.type==="image/jpeg" || this.state.imagePath.type==="image/png")
            {
                 let formData=new FormData;
                 
                 formData.append("pname",this.state.pname);
                 formData.append("cname",this.state.cname);
                 formData.append("price",this.state.price);
                 formData.append("quantity",this.state.quantitiy);
                 formData.append("feature",this.state.feature);
                 formData.append("attach",this.state.imagePath);
                 formData.append("pid",this.props.match.params.pid);
                 //CODE to be executed
                 editProWithImage(formData)
                 .then(res=>
                     {
                         if(res.data.err==0)
                         {
                             alert(res.data.msg);
                             this.props.history.push("/dashboard/product");
                         }
                         if(res.data.err==1)
                         {  
                             alert(res.data.msg);
                         }
                     
                     })
            }
            else
            {
                this.setState({errMsg:'Only jpg,jpeg and png image support'});
            }
        }
    }

    render() {
        return (
            <div>
            <main>
                <header>
                <Header {...this.props}/>
                </header>
                <br/>
                <section className="row container">
                    <aside className="col-sm-3"><Sidebar/></aside>
                    <aside className="col-sm-9">
                    {this.state.errMsg!=""? <div className="alert alert-danger">
                    {this.state.errMsg}
                    </div>:"" }
            <h2>Edit Product</h2>
            
            <form onSubmit={this.editpro}>
            <div className="form-group">
                                <label> Category Name</label>
                                <select type="text" className="form-control" name="cname" 
                                 value={this.state.cname} onChange={this.handler}  >
                                     <option>Select One</option>
                                    {
                                        this.state.cdata.map(data =>
                                            <option value={data.cname}>{data.cname}</option>)
                                    }
                                </select>

                            </div>
    <div className="form-group">
    <br/>
         <label>Product Name</label>
         <input type="text" name="Pname" className="form-control" onChange={this.handler} value={this.state.pname}/>
    </div>
    
    <div className="form-group">
    <br/>
         <label>Price</label>
         <input type="value" name="price" className="form-control" onChange={this.handler} value={this.state.price}/>
    </div>
    <div className="form-group">
    <br/>
         <label>Quantity</label>
         <input type="value" name="quantity" className="form-control" onChange={this.handler} value={this.state.quantity}/>
    </div>
    <div className="form-group">
    <br/>
         <label>Feature</label>
         <input type="text" name="feature" className="form-control" onChange={this.handler} value={this.state.handler}/>
    </div>

     <div className="form-group">
     <label>Image</label>
     <input type="file" name="attach" className="form-control" onChange={this.attach}/>
     <img src={`${URL}${this.state.imageUrl}`} width={50} height={50}/>
  </div>
 
<input type="submit" value="Submit" class="btn btn-success"/>

         </form>
         </aside>
         </section>
         </main>
            </div>
        )
    }
}

export default Editpro

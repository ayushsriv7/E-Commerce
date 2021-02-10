import React, { Component } from 'react'
import Header from './Header';
import Sidebar from './Sidebar';
import {getCat} from '../services/Myser';
import {addPro} from '../services/Myser';

export class Addpro extends Component {
    state={cname:'',pname:'',price:'',quantity:'',feature:'',imagePath:'',errMsg:''}
    state={catdata:[]}
    componentDidMount()
    {
        getCat()
        .then(res=>
            {
                if(res.data.err==0)
                {
                    this.setState({catdata:res.data.cdata})
                }
            })
    }
    handler=(event)=>
    {
        //this.setState({pname:event.target.name}
        const {name,value}=event.target
        this.setState({[name]:value});
       // this.setState({cname:event.target.name});
    }
    attach=(event)=>
    {
        if(event.target.files.length>0)
        {
            let attachdata=event.target.files[0];
            this.setState({imagePath:attachdata});
            console.log(attachdata);
        }
    }
    addpro=(event)=>
    {
        event.preventDefault();
        if(this.state.imagePath!="")//check file
        {
            //restrict only image upload
            if(this.state.imagePath.type==="image/png" || this.state.imagePath.type==="image/jpg" || this.state.imagePath.type==="image/jpeg")
            {   
                let formData=new FormData();
                formData.append("pname",this.state.pname);
                formData.append("cname",this.state.cname);
                formData.append("price",this.state.price);
                formData.append("quantity",this.state.quantity);
                formData.append("feature",this.state.feature);
                
                formData.append("attach",this.state.imagePath);
                addPro(formData).then(res=>{
                    if(res.data.err==0)
                    {
                        alert(res.data.msg);
                        this.props.history.push("/dashboard/product")
                     //   this.props.history.push("/dashboard/category")
                    }
                    if(res.data.err==1)
                    {
                        alert(res.data.msg);
                    }
                })
            }
            else{
                this.setState({errMsg:'Only jpg,jpeg and png file supported'})
            }
        }
        else{
            this.setState({errMsg:'Please Select an image'})
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
                   
                    <h2>Add Product</h2>
                    <form onSubmit={this.addpro}>
            <div className="form-group">
            <br/>
                 <label>Catergory Name</label>
                 <select  name="cname" className="form-control" onChange={this.handler}>
                 {this.state.catdata.map(data=>
                    
                 <option value={data.category}>{data.category}</option>)}</select>
            </div>
            <div className="form-group">
            <br/>
                 <label>Product Name</label>
                 <input type="text" name="pname" className="form-control" onChange={this.handler}/>
            </div>
            <div className="form-group">
            <br/>
                 <label>Price</label>
                 <input type="value" name="price" className="form-control" onChange={this.handler}/>
            </div>
            <div className="form-group">
            <br/>
                 <label>Quantity</label>
                 <input type="value" name="quantity" className="form-control" onChange={this.handler}/>
            </div>
            <div className="form-group">
            <br/>
                 <label>Feature</label>
                 <input type="text" name="feature" className="form-control" onChange={this.handler}/>
            </div>

            
             <div className="form-group">
             <label>Image</label>
             <input type="file" name="attach" className="form-control" onChange={this.attach}/>
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

export default Addpro
 
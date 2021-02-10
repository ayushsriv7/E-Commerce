import React, { Component } from 'react'
import Header from './Header';
import Sidebar from './Sidebar';
import{Link} from 'react-router-dom';
import{getPro,delProduct} from '../services/Myser';
import{URL} from '../config/path';
export class Product extends Component {
    state={pdata:[]};
    componentDidMount(){
        this.getdata();
    }
    getdata=()=>
    {
        getPro().then(res=>{
            if(res.data.err==0)
            {
                this.setState({pdata:res.data.pdata})
            }
        })
    }
    editPro=(pid)=>{
        this.props.history.push("/dashboard/editpro/"+pid);
    }
    delPro=(pid,pimage)=>
    {
        if(window.confirm("Do you want to delete"))
        {
        delProduct(pid,pimage)
        .then(res=>{
            if(res.data.err==0)
            {
                alert(res.data.msg);
                getPro().then(res=>{
                    if(res.data.err==0)
                    {
                        this.setState({pdata:res.data.pdata})
                    }
                })
            }
            if(res.data.err==1)
            {
                alert(res.data.msg)
            }
        })
    }
    }
    render() {
        return (
            <div>
               <main>
                <header><Header {...this.props}/></header>
                <br/>
                <section className="row container">
                    <aside className="col-sm-3"><Sidebar/></aside>
                    <aside className="col-sm-9"><h1>Products</h1>
                    <table className="table">
                    <tr><th colspan={8} className="text-center"><Link to="/dashboard/addpro" className="btn btn-dark">Add Products</Link></th></tr>
                    <tr>
                        <th>S.no</th>
                        <th>Cname</th>
                        <th>Pname</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Image</th>
                        <th>Features</th>
                        <th>Action</th>
                    </tr>
                    {this.state.pdata.map((pro,ind)=>
                        <tr>
                        <th>{ind+1}</th>
                        <th>{pro.cname}</th>
                        <th>{pro.pname}</th>
                        <th>{pro.price}</th>
                        <th>{pro.quantity}</th>
                        <td>
                        <img src={`${URL}${pro.image}`} width={50} height={50}/>
                        </td>
                         <th>{pro.feature}</th>
                        
                        
                       
                
                        
                       <td><button className="alert alert-dark" onClick={()=>this.editPro(pro._id)}>Edit</button>
                        <button className="alert alert-danger" onClick={()=>this.delPro(pro._id,pro.image)}>Delete</button></td>
                    </tr>
                      )}  
                    </table>
                    </aside>
                    
                </section>
               </main>
            </div>
        )
    }
}

export default Product

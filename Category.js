import React, { Component } from 'react'
import Header from './Header';
import Sidebar from './Sidebar';
import{Link} from 'react-router-dom';
import{getCat,delCategory} from '../services/Myser';
import{URL} from '../config/path';
export class Category extends Component {
    state={cdata:[]};
    componentDidMount()
    {
        getCat()
        .then(res=>{
            if(res.data.err==0)
            {
                this.setState({cdata:res.data.cdata})
            }
        })
    }
    editCat=(cid)=>{
        this.props.history.push("/dashboard/editcat/"+cid);
    }
    delCat=(cid,cimage)=>
    {
        if(window.confirm("Do you want to delete"))
        {
        delCategory(cid,cimage)
        .then(res=>{
            if(res.data.err==0)
            {
                alert(res.data.msg);
                getCat().then(res=>{
                    if(res.data.err==0)
                    {
                        this.setState({cdata:res.data.cdata})
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
                    <aside className="col-sm-9"><h1>Category</h1>
                    <table className="table">
                    <tr><th colspan={5} className="text-center"><Link to="/dashboard/addcat" className="btn btn-dark">Add Category</Link></th></tr>
                    <tr>
                        <th>S.no</th>
                        <th>Cname</th>
                        <th>Image</th>
                        <th>Date</th>
                        <th>Action</th>
                    </tr>
                  {this.state.cdata.map((cat,ind)=>
                    <tr>
                    <td>{ind+1}</td>
                    <td>{cat.category}</td>
                    <td>
                    <img src={`${URL}${cat.image}`} width={50} height={50}/>
                    </td>
                    <td>{cat.created_at}</td>
                    
                    <td><button className="alert alert-dark" onClick={()=>this.editCat(cat._id)}>Edit</button>
                    <button className="alert alert-danger" onClick={()=>this.delCat(cat._id,cat.image)}>Delete</button></td>
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

export default Category

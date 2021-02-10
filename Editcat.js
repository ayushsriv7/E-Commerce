import React, { Component } from 'react'
import Header from './Header';
import Sidebar from './Sidebar';
import{getCatByid, editCatWithImage, editCatWithoutImage} from '../services/Myser';
import{URL} from '../config/path';
export class Editcat extends Component {
    state={cname:'',imageUrl:'',imagePath:'',errMsg:''}
    componentDidMount()
    {   //read params
        let cid=this.props.match.params.cid;
        getCatByid(cid)
        .then(res=>
            {
                if(res.data.err==0)
                {
                    this.setState({cname:res.data.cdata.category})
                    this.setState({imageUrl:res.data.cdata.image})
                }
            })
    }
    handler=(event)=>
    {
        this.setState({cname:event.target.value});
    }
    attach=(event)=>
    {
        if(event.target.files.length>0)
        {
            this.setState({imagePath:event.target.files[0]})
        }
    }
    editcat=(event)=>
    {
        event.preventDefault();
        if(this.state.imagePath=="")
        {
            let formData={cname:this.state.cname,cid:this.props.match.params.cid};
            editCatWithoutImage(formData)
            .then(res=>
                {
                    if(res.data.err==0)
                    {
                        alert(res.data.msg);
                        this.props.history.push("/dashboard/category");
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
                 formData.append("cname",this.state.cname);
                 formData.append("attach",this.state.imagePath);
                 formData.append("cid",this.props.match.params.cid);
                 //CODE to be executed
                 editCatWithImage(formData)
                 .then(res=>
                     {
                         if(res.data.err==0)
                         {
                             alert(res.data.msg);
                             this.props.history.push("/dashboard/category");
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
            <h2>Edit Category</h2>
            
            <form onSubmit={this.editcat}>
    <div className="form-group">
    <br/>
         <label>Category Name</label>
         <input type="text" name="Cname" className="form-control" onChange={this.handler} value={this.state.cname}/>
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

export default Editcat

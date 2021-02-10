import React, { Component } from 'react'
import Header from './Header';
import Sidebar from './Sidebar';
import {changePass} from '../services/Myser';
export class ChangePass extends Component {
    state={op:'',np:'',cp:'',errMsg:'',sussMsg:''}
    handler=(event)=>{
        const {name,value}=event.target;
        this.setState({[name]:value});
    }
    cpass=(event)=>
    {
        event.preventDefault();
        if(this.state.np==this.state.cp)
        {
            let formData={op:this.state.op,np:this.state.np,uid:localStorage.getItem('uid')};
            changePass(formData).then(res=>
                {
                    if(res.data.err==0)
                    {
                        this.setState({sussMsg:res.data.msg});
                    }
                    if(res.data.err==1)
                    {
                        this.setState({errMsg:res.data.msg});
                    }
                })
        }
        else{
            this.setState({errMsg:"New Password and Confirm Password does not match"});
        }
    }
    render() {
        return (
            <div>
            <main>
             <header><Header/></header>
             <br/>
             <section className="row container">
                 <aside className="col-sm-3"><Sidebar/></aside>
                 <aside className="col-sm-9">
                 <h1>Change Password</h1>
                 {this.state.errMsg!=""?
                <div className="alert alert-danger">
                    {this.state.errMsg}
                </div>:null}
                {this.state.sussMsg!=""?
                <div className="alert alert-success">
                    {this.state.sussMsg}
                </div>:null}
                 <form onSubmit={this.cpass}>
            <div className="form-group">
                 <label>Old Password</label>
                 <input type="password" name="op" className="form-control" onChange={this.handler}/>
            </div>
             <div className="form-group">
             <label>New Password</label>
             <input type="password" name="np" className="form-control" onChange={this.handler}/>
          </div>
          <div className="form-group">
          <label>Confirm Password</label>
          <input type="password" name="cp" className="form-control" onChange={this.handler}/>
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

export default ChangePass

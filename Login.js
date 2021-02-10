import React, { Component } from 'react'
import {regisUser,userLogin} from '../services/Myser';
export class Login extends Component {
    constructor(props)
    {
        super(props);
        this.state={name:'',password:'',email:'',lemail:'',lpassword:''}
    }
    regisHandler=(event)=>
    {
        const {name,value}=event.target;
        this.setState({[name]:value})
    }
    regisForm=(event)=>
    {
        event.preventDefault();
        const formData={name:this.state.name,email:this.state.email,password:this.state.password};
        regisUser(formData)
        .then(res=>
            {
                if(res.data.err==0)
                {
                    alert(res.data.msg);
                }
                
                if(res.data.err==1)
                {
                    alert(res.data.msg);
                }
            })
    }
    loginHnadler=(event)=>
    {
        const {name,value}=event.target;
        this.setState({[name]:value})
        
    }
    loginUser=(event)=>
    {
        event.preventDefault();
        let formData={email:this.state.lemail,password:this.state.lpassword};
        userLogin(formData)
        .then(res=>
            {
                if(res.data.err==0)
                {
                    alert(res.data.msg);
                }
                
                if(res.data.err==1)
                {
                    alert(res.data.msg);
                }
            }
            )
    }
    render() {
        return (
            <div>
            <section id="form">
            <div className="container">
                <div className="row">
                    <div className="col-sm-4 col-sm-offset-1">
                        <div className="login-form">
                            <h2>Login to your account</h2>
                            <form onSubmit={this.loginUser}>
                                <input type="text" placeholder="Email" name="lemail"  onChange={this.loginHandler}/>
                                <input type="password" placeholder="Email Address" name="lpassword" onChange={this.loginHandler} />
                                <span>
                                    <input type="checkbox" className="checkbox" name="check"/> 
                                    Keep me signed in
                                </span>
                                <button type="submit" className="btn btn-default">Login</button>
                            </form>
                        </div>
                    </div>
                    <div className="col-sm-1">
                        <h2 className="or">OR</h2>
                    </div>
                    <div className="col-sm-4">
                        <div className="signup-form">
                            <h2>New User Signup!</h2>
                            <form onSubmit={this.regisForm}>
                                <input type="text" placeholder="Name" name="name" onChange={this.regisHandler}/>
                                <input type="email" placeholder="Email Address" name="email" onChange={this.regisHandler}/>
                                <input type="password" placeholder="Password" name="password" onChange={this.regisHandler}/>
                                <button type="submit" className="btn btn-default">Signup</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
            </div>
        )
    }
}

export default Login

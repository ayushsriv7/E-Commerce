import React, { Component } from 'react'
import{Link} from 'react-router-dom';
import {getcategory} from '../services/Myser';
import {connect} from 'react-redux';
export class Header extends Component {
    state={catdata:[] };
    componentDidMount(){
        getcategory()
        .then(res=>
            {
                if(res.data.err==0)
                {
                    this.setState({catdata:res.data.cdata});
                }

            })
    }

    render() {
        return (
            <div>
            <header id="header">
            <div className="header_top">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="contactinfo">
                                <ul className="nav nav-pills">
                                    <li><a href="#"><i className="fa fa-phone"></i> +2 95 01 88 821</a></li>
                                    <li><a href="#"><i className="fa fa-envelope"></i> info@domain.com</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="social-icons pull-right">
                                <ul className="nav navbar-nav">
                                    <li><a href="#"><i className="fa fa-facebook"></i></a></li>
                                    <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                                    <li><a href="#"><i className="fa fa-linkedin"></i></a></li>
                                    <li><a href="#"><i className="fa fa-dribbble"></i></a></li>
                                    <li><a href="#"><i className="fa fa-google-plus"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="header-middle">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-4">
                            <div className="logo pull-left">
                                <a href="index.html"><img src="images/home/logo.png" alt="" /></a>
                            </div>
                            <div className="btn-group pull-right">
                                
                                
                               
                            </div>
                        </div>
                        <div className="col-sm-8">
                            <div className="shop-menu pull-right">
                                <ul className="nav navbar-nav">
                                    <li><a href="#"><i className="fa fa-user"></i> Account</a></li>
                                    <li><a href="#"><i className="fa fa-star"></i> Wishlist</a></li>
                                    <li><a href="checkout.html"><i className="fa fa-crosshairs"></i> Checkout</a></li>
                                    <li><a href="cart.html"><i className="fa fa-shopping-cart"></i> Cart{this.props.mycount!=undefined?<label>
                                        ({this.props.mycount.length})</label>:""}</a></li>
                                    <li><Link to="/login"><i className="fa fa-lock"></i> Login</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        
            <div className="header-bottom">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-9">
                            <div className="navbar-header">
                                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                                    <span className="sr-only">Toggle navigation</span>
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                </button>
                            </div>
                            <div className="mainmenu pull-left">
                                <ul className="nav navbar-nav collapse navbar-collapse">
                                    <li><Link to="/" className="active">Home</Link></li>
                                    <li className="dropdown"><a href="#">Category<i className="fa fa-angle-down"></i></a>
                                        <ul role="menu" className="sub-menu">
                                        {this.state.catdata.map(cat=>
                                            <li><Link to={`category-products/${cat.category}`}>{cat.category}</Link></li>
                                            )}
                                        </ul>
                                    </li> 
                                    <li className="dropdown"><a href="#">Blog<i className="fa fa-angle-down"></i></a>
                                        <ul role="menu" className="sub-menu">
                                            <li><a href="blog.html">Blog List</a></li>
                                            <li><a href="blog-single.html">Blog Single</a></li>
                                        </ul>
                                    </li> 
                                    <li><a href="404.html">404</a></li>
                                    <li><Link to="/contact-us">Contact</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="search_box pull-right">
                                <input type="text" placeholder="Search"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
            </div>
        )
    }
}
const mapStateToProps=(state)=>
{
    return{
        mycount:state.pcart
    }
}
export default connect(mapStateToProps) (Header)

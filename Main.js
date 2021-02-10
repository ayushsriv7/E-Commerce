import React, { Component } from 'react'
import Slider from './includes/Slider';
import Sidebar from './includes/Sidebar';
import {getPro} from "../services/Myser";
import{URL} from "../configs/path";
import{Link}from 'react-router-dom';
//redux call in component
import {connect} from 'react-redux';
export class Main extends Component {
	state={pdata:[]};
	componentDidMount()
	{
		getPro()
		.then(res=>
			{
				if(res.data.err==0)
				{
					this.setState({pdata:res.data.pdata})
				}
			})
	}
	addCart=(pid)=>
	{
		if(localStorage.getItem('pcart')!=undefined)
		{
			let arr=JSON.parse(localStorage.getItem('pcart'));
			if(arr.includes(pid))
			{
				alert("Product already added");
			}
			else
			{
			arr.push(pid);
			localStorage.setItem('pcart',JSON.stringify(arr));
			this.props.myCart(arr);
			alert("Add cart successfully");
		}
	}
		else
		{
			let arr=[];
			arr.push(pid);
			localStorage.setItem('pcart',JSON.stringify(arr));
			this.props.myCart(JSON.stringify(arr));
			alert("Add cart successfully");
		}
	}
    render() {
        return (
            <div>
                <Slider/>
                <section>
		<div class="container">
            <div class="row">
            <Sidebar/>
            <div class="col-sm-9 padding-right">
            <div class="features_items">
						<h2 class="title text-center">Features Items</h2>
						{this.state.pdata.map(pro=>
						<div class="col-sm-4">
							<div class="product-image-wrapper">
								<div class="single-products">
										<div class="productinfo text-center">
										<Link to={`/product-detail/${pro._id}`}>
											<img src={`${URL}${pro.image}`} alt="" width={200} height={150}/>
											</Link>
											<h2>₹{pro.price}</h2>
											<p>{pro.pname}</p>
											<a href="javascript:void(0)" onClick={()=>this.addCart(pro._id)} class="btn btn-default add-to-cart"><i class="fa fa-shopping-cart"></i>Add to cart</a>
										</div>
										
								</div>
								<div class="choose">
									<ul class="nav nav-pills nav-justified">
										<li><a href="#"><i class="fa fa-plus-square"></i>Add to wishlist</a></li>
										<li><a href="#"><i class="fa fa-plus-square"></i>Add to compare</a></li>
									</ul>
								</div>
							</div>
						</div>
						
						)}</div>
            </div>
            </div>
            </div>
            </section>
            </div>
        )
    }
}
const mapStateToProps=(state)=>
{}
const mapDispatchToProps=(dispatch)=>
{
	return{
		myCart:(cdata)=>
		{
			dispatch({type:'addcart',payload:cdata})
		}
	}
}
export default connect(mapStateToProps,mapDispatchToProps) (Main)

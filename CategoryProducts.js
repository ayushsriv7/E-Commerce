import React, { Component } from 'react'
import Slider from './includes/Slider';
import {getproductbycat} from "../services/Myser";
import{URL} from "../configs/path";
import Sidebar from './includes/Sidebar';
export class CategoryProducts extends Component {
    state={cname:this.props.match.params.cname,pdata:[]}
	componentDidMount()
	{
		getproductbycat(this.props.match.params.cname)
		.then(res=>
			{
				if(res.data.err==0)
				{
					this.setState({pdata:res.data.pdata})
					console.log(res.data.pdata)
				}
				if(res.data.err==1)
				{
					//this.setState({pdata:res.data.pdata})
					console.log(res.data.msg)
				}
			})
	}
    render() {
        return (
            <div>
                
                <section>
		<div class="container">
            <div class="row">
            <Sidebar/>
            <div class="col-sm-9 padding-right">
            <div class="features_items">
						<h2 class="title text-center">{this.state.cname} Products </h2>
						{this.state.pdata.map(pro=>
							<div class="col-sm-4">
								<div class="product-image-wrapper">
									<div class="single-products">
											<div class="productinfo text-center">
												<img src={`${URL}${pro.image}`} alt="" width={200} height={150}/>
												<h2>₹{pro.price}</h2>
												<p>{pro.pname}</p>
												<a href="#" class="btn btn-default add-to-cart"><i class="fa fa-shopping-cart"></i>Add to cart</a>
											</div>
											<div class="product-overlay">
												<div class="overlay-content">
													<h2>$56</h2>
													<p>Blank</p>
													<a href="#" class="btn btn-default add-to-cart"><i class="fa fa-shopping-cart"></i>Add to cart</a>
												</div>
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

export default CategoryProducts

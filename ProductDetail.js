import React, { Component } from 'react'
import Slider from './includes/Slider';
import Sidebar from './includes/Sidebar';
import {getPro} from "../services/Myser";
import{URL} from "../configs/path";
import{Link}from 'react-router-dom';
export class Main extends Component {
	state={pid:this.props.match.params.pid};
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
						<h2 class="title text-center">Product details</h2>
                        <div class="col-sm-5">
							<div class="view-product">
								<img src="images/product-details/1.jpg" alt="" />
								<h3>ZOOM</h3>
							</div>
							<div id="similar-product" class="carousel slide" data-ride="carousel">
								
								  
								    <div class="carousel-inner">
										<div class="item active">
										  <a href=""><img src="images/product-details/similar1.jpg" alt=""/></a>
										  <a href=""><img src="images/product-details/similar2.jpg" alt=""/></a>
										  <a href=""><img src="images/product-details/similar3.jpg" alt=""/></a>
										</div>
										<div class="item">
										  <a href=""><img src="images/product-details/similar1.jpg" alt=""/></a>
										  <a href=""><img src="images/product-details/similar2.jpg" alt=""/></a>
										  <a href=""><img src="images/product-details/similar3.jpg" alt=""/></a>
										</div>
										<div class="item">
										  <a href=""><img src="images/product-details/similar1.jpg" alt=""/></a>
										  <a href=""><img src="images/product-details/similar2.jpg" alt=""/></a>
										  <a href=""><img src="images/product-details/similar3.jpg" alt=""/></a>
										</div>
										
									</div>

								  
								  <a class="left item-control" href="#similar-product" data-slide="prev">
									<i class="fa fa-angle-left"></i>
								  </a>
								  <a class="right item-control" href="#similar-product" data-slide="next">
									<i class="fa fa-angle-right"></i>
								  </a>
							</div>

						</div>
						<div class="col-sm-7">
							<div class="product-information">
						
								<img src="images/product-details/new.jpg" class="newarrival" alt="" />
								<h2>Anne Klein Sleeveless Colorblock Scuba</h2>
								<p>Web ID: 1089772</p>
								<img src="images/product-details/rating.png" alt="" />
								<span>
									<span>US $59</span>
									<label>Quantity:</label>
									<input type="text" value="3" />
									<button type="button" class="btn btn-fefault cart">
										<i class="fa fa-shopping-cart"></i>
										Add to cart
									</button>
								</span>
								<p><b>Availability:</b> In Stock</p>
								<p><b>Condition:</b> New</p>
								<p><b>Brand:</b> E-SHOPPER</p>
								<a href=""><img src="images/product-details/share.png" class="share img-responsive"  alt="" /></a>
							</div>
						</div>
					</div>
                        </div>
            </div>
            </div>
            
            </section>
            </div>
        )
    }
}

export default Main

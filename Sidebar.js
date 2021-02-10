import React, { Component } from 'react'
import {Link} from 'react-router-dom';
export class Sidebar extends Component {
    render() {
        return (
            <div>
            <div className="list-group">
            <Link to="/dashboard/category" className="list-group-item list-group-item-action active">
              <b>Category</b>
            </Link>
            <Link to="/dashboard/products" className="list-group-item list-group-item-action active">
            <b>Products</b>
          </Link>
          <Link to="/dashboard/orders" className="list-group-item list-group-item-action active">
              <b>Orders</b>
            </Link>
            <Link to="/dashboard/feedback" className="list-group-item list-group-item-action active">
             <b> Feedback</b>
            </Link>
          </div>
            </div>
        )
    }
}

export default Sidebar

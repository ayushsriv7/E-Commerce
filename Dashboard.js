import React, { Component } from 'react'
import Header from './Header';
import Sidebar from './Sidebar';
export class Dashboard extends Component {
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
                    <aside className="col-sm-9">Content</aside>
                </section>
               </main>
            </div>
        )
    }
}

export default Dashboard
 
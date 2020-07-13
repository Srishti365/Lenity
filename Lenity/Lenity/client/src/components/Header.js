import React from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';

import * as actions from '../actions';

import '../css/style.css';
import '../css/Header.css';
import logo from './favicon.png';

class Header extends React.Component{
    constructor(props){
        super(props);
        this.signOut = this.signOut.bind(this);
    }

    signOut(){
        console.log('Signout called');
        this.props.signOut();
    }

    render(){
        return(
//             <nav className="navbar navbar-expand-lg navbar-dark bg-dark" >
//                 <Link to="/" className="navbar-brand">Lenity</Link>
//                 <div className="collapse navbar-collapse">
//                     <ul className="navbar-nv mr-auto">
//                         <li className="nav-item">
//                             <Link to="/dashboard" className="nav-link">Dashboard</Link>
//                         </li>

//                     </ul>
//                     <ul className="nav navbar-nav ml-auto">
//                         {!this.props.isAuth ?[<li className="nav-item">
//                             <Link to="/signup" className="nav-link">Sign Up</Link>
//                         </li>,
//                         <li className="nav-item">
//                             <Link to="/signin" className="nav-link">Sign In</Link>
//         </li>,
//     <li className="nav-item">
//     <Link to="/executivesignin" className="nav-link">Sign In As executive</Link>
// </li>] : null }
//                         {this.props.isAuth ?[<li className="nav-item">
//                             <Link to="/signout"className="nav-link" onClick={this.signOut}>Sign Out</Link>
//                         </li>]:null }
                        
//                     </ul>
//                 </div>
//             </nav>
<header class="main_menu home_menu">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-lg-12">
                    <nav class="navbar landing navbar-expand-lg navbar-light fixed-top">
                    <Link to="/" className="navbar-brand name"> <img src={logo} alt="logo"/>&nbsp;&nbsp;Lenity </Link>
                        <button class="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                            <span class="ti-menu"></span>
                        </button>

                        <div class="collapse navbar-collapse main-menu-item justify-content-end"
                            id="navbarSupportedContent">
                            <ul class="navbar-nav align-items-center">
                                <li class="nav-item">
                                    <a class="nav-link" href="about.html">About</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="Causes.html">Causes</a>
                                </li>

                                <li class="nav-item dropdown">
                                    <a class="nav-link dropdown-toggle" href="blog.html" id="navbarDropdown"
                                        role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Pages
                                    </a>
                                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <a class="dropdown-item" href="Event.html">Event</a>
                                        <a class="dropdown-item" href="elements.html">Elements</a>
                                    </div>
                                </li>
                                <li class="nav-item dropdown">
                                    <a class="nav-link dropdown-toggle" href="blog.html" id="navbarDropdown_1"
                                        role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        blog
                                    </a>
                                    <div class="dropdown-menu" aria-labelledby="navbarDropdown_1">
                                        <a class="dropdown-item" href="blog.html">blog</a>
                                        <a class="dropdown-item" href="single-blog.html">Single blog</a>
                                    </div>
                                </li>

                                <li class="nav-item">
                                    <Link class="nav-link" to="/executivesignin">Executive</Link>
                                </li>
                                <li class="d-none d-lg-block">
                                    <Link class="btn_2" to='/signup'>Join Lenity</Link>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    </header>
    
        );
    };

}

function mapStateToProps(state){
    return{
        isAuth: state.auth.isAuthenticated
    }
}


//export default Header;
export default connect(mapStateToProps,actions)(Header);
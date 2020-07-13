import React from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';

import * as actions from '../actions';

import '../css/style.css';
import '../css/Header.css';
import logo from './favicon.png';

class SignHeader extends React.Component{
    
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
                    <nav class="navbar navbar-expand-lg navbar-light fixed-top">
                    <Link to="/" className="navbar-brand name"> <img src={logo} alt="logo"/>&nbsp;&nbsp;Lenity </Link>
                        <button class="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                            <span class="ti-menu"></span>
                        </button>

                        <div class="collapse navbar-collapse main-menu-item justify-content-end"
                            id="navbarSupportedContent">
                            
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    </header>
    
        );
    };

}

export default SignHeader;
import React from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';

import * as actions from '../actions';

import '../css/style.css';
import '../css/Header.css';
import '../css/LogHeader.css';
import logo from './favicon.png';

class LogHeader extends React.Component{
    
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
<nav class="navbar navbar-expand-sm navbar-dark lognav">
<Link class="navbar-brand" to="./dashboard">LENITY</Link>

<ul class="navbar-nav ml-auto">
  <li class="nav-item mr-2">
  <Link to="/foodDonate"><span className="colorwhite">Donate Food</span></Link>
  </li>
  <li class="nav-item mr-2">
  <Link to="/editProfile"><span className="colorwhite">View Profile</span></Link>
  </li>

  <li class="nav-item mr-2">
    <Link to="/signout"><span className="colorwhite">SignOut</span></Link>
  </li>

</ul>

</nav>
  
        );
    };

}

export default LogHeader;
import React from "react";
import { Link } from "react-router-dom";

import viewProfile from "./viewProfile";
import LogHeader from "./LogHeader";
import "../css/style.css";

import "../css/Dashboard.css";
import profile from "./top_service.png";
import c1 from "./c1.png"
import c2 from "./c2.png"
import c3 from "./c3.png"

class Dashboard extends React.Component {
  render() {
    return (
      <div>
        <LogHeader />
        <section class="about_us1">
          <div class="container">
            <div class="row justify-content-between">
              {/* <div class="col-lg-4">
                <div class="about_us_img">
                  <Link to="/viewProfile">
                    <img src={profile} alt="" />
                  </Link>
                </div>
              </div> */}
              {/* <div class="col-lg-8">
                <div class="about_us_text">
                  <h5>
                    2000
                    <br />
                    <span>since</span>
                  </h5>
                  <h2>About Believe</h2>
                  <p>
                    According to the research firm Frost & Sullivan, the
                    estimated size of the North American used test and
                    measurement equipment market was $446.4 million in 2004 and
                    is estimated to grow to $654.5 million by 2011. For over 50
                    years, companies and governments have procured used test and
                    measurement instruments.
                  </p> */}
              {/*--------------------------------functionality*/}
              {/* <div class="banner_item">
                <div class="single_item">
                  <h2>
                    <Link to="/foodDonate">Donate Food</Link>
                  </h2>
                </div>
                <div class="single_item">
                  <h2>
                    <Link to="/ItemDonate">Donate Stuff</Link>
                  </h2>
                </div>
                <div class="single_item">
                  <h2>
                    <Link to="/">Requests</Link>
                  </h2>
                </div>
              </div> */}

              {/***************************************************** */}
              <div class="about_us_text1">
                <div class="sidenoteparent">
                  <Link to="/viewProfile"><i class="fa fa-user-circle-o fa-3x" aria-hidden="true"></i>
                  </Link><div class="sidenote">JOIN US
                  <Link to="/chat"><div class="sidenotechild">CONNECT WITH OTHERS</div></Link>

                  </div>



                </div>
                <div class="coupicon">
                  <i class="fa fa-barcode fa-2x" aria-hidden="true"></i>
                  <div class="coupicon2"><Link to="/itemrequests">View Requests</Link></div></div>

              </div>

              <div class="container">
                <div class="row justify-content-between">
                  <div class="col-lg-4 mydiv">
                    <div class="ban1">
                      <h4>Donate Food</h4>
                      <div class="img"><img src={c1} /></div>
                      <p>It you're. Was called you're fowl grass lesser land together waters beast darkness earth land whose male all moveth fruitful</p>
                      <div class="text-center about_btn">
                        <Link class="btn_3 " to="/foodDonate" >
                          Donate Food
                  </Link>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-4 mydiv">
                    <div class="ban1">
                      <h4>Give Away Items</h4>
                      <div class="img"><img src={c2} /></div>
                      <p>It you're. Was called you're fowl grass lesser land together waters beast darkness earth land whose male all moveth fruitful</p>
                      <div class="text-center about_btn">
                        <Link class="btn_3 " to="/ItemDonate">
                          Give Away Stuff
                  </Link>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-4 mydiv">
                    <div class="ban1">
                      <h4>Donate To NGO</h4>
                      <div class="img"><img src={c3} /></div>
                      <p>It you're. Was called you're fowl grass lesser land together waters beast darkness earth land whose male all moveth fruitful</p>
                      <div class="text-center about_btn">
                        <Link class="btn_3 " to="/ngoDonate" >
                          Donate To NGO
                  </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/*************************************** */}
              {/* 
                </div>
              </div> */}


              <div class="col-lg-12">
                <div class="text-center about_btn">
                  <Link class="btn_3 " to="/search">
                    Search for Stuff
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="row dashboard container-fluid">
          <Link to="/viewProfile">View your profile</Link>
          <Link to="/foodDonate">Donate food</Link>
          <br />
          <Link to="/NgoDonate">Donate to ngo</Link>
          <br />
          <Link to="/pendingreq">View pending req</Link>
          <Link to="/search">Search for items</Link>
          <Link to="/itemrequests">approve your pending requests</Link>
        </div>
      </div>
    );
  }
}

export default Dashboard;

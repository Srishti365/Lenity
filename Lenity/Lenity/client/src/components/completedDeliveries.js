import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import LogHeader from "./LogHeader";
import profile from "./top_service.png";

class completedDeliveries extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      user: {},
      isconfirm: false
    };
  }

  getDataAxios = async () => {
    console.log("jwt token", localStorage.getItem("JWT_TOKEN"));
    const res = await axios.get("http://localhost:8080/executive/delivered", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("JWT_TOKEN")
      }
    });
    console.log("executive dashboard retun :", res.data);
    this.setState({ user: res.data.executive_data, isLoading: false }, () => {
      //console.log(this.state.user.email);
      console.log("state now", this.state.user);
      console.log(this.state.isLoading, "..state updated");
    });
  };
  componentDidMount() {
    this.getDataAxios();
  }

  //   componentDidUpdate(){
  //     this.getDataAxios();
  //   }

  render() {
    return (
      <div>
        <LogHeader />

        <section class="about_us">
          <div class="container">
            <div class="row justify-content-between align-items-center">

              {/***************************** */}
              <div class="about_us_text1">
                <div class="sidenoteparent">
                  <i class="fa fa-user-circle-o fa-3x" aria-hidden="true"></i>
                  <div class="sidenote">JOIN US
                  <div class="sidenotechild">CONNECT WITH OTHERS</div>

                  </div>



                </div>
                <div class="coupicon">
                  <i class="fa fa-barcode fa-2x" aria-hidden="true"></i>
                  <div class="coupicon2"><Link to="/execdashboard">View Pending Deliveries</Link></div></div>

              </div>

              {/********************** */}


              <div class="col-lg-4">

              </div>
              <div class="col-lg-12">
                <div class="about_us_text">
                  <h2>Food Status</h2>
                  <hr></hr>
                  <div>
                    {!this.state.isLoading ? (
                      <div>
                        {" "}
                        {this.state.user.food.map((food, index) => (
                          <p>
                            <h4>
                              Donated by: {food.donatedBy} from {food.location}{" "}

                              <br />
                            </h4>
                          </p>
                        ))}{" "}
                      </div>
                    ) : (
                        <div>Loading..</div>
                      )}
                  </div>
                </div>
                <div class="about_us_text">
                  <h2>Item Status</h2>
                  <hr></hr>
                  <div>
                    {!this.state.isLoading ? (
                      <div>
                        {" "}
                        {this.state.user.item.map((item, index) => (
                          <p>
                            {" "}
                            <h4>
                              Donated by: {item.donatedBy} from {item.location}{" "}

                              <br />
                            </h4>
                          </p>
                        ))}{" "}
                      </div>
                    ) : (
                        <div>Loading..</div>
                      )}
                  </div>
                </div>
                <div class="about_us_text">
                  <h2>NGO Donations</h2>
                  <hr></hr>
                  <div>
                    {!this.state.isLoading ? (
                      <div>
                        {" "}
                        {this.state.user.ngo.map((ngo, index) => (
                          <p>
                            {" "}
                            <h4>
                              Donated by: {ngo.donatedBy} from {ngo.location}
                              <br />
                            </h4>
                          </p>
                        ))}{" "}
                      </div>
                    ) : (
                        <div>Loading..</div>
                      )}
                  </div>
                </div>
                <div class="about_us_text">
                  <h2>NGO Requests Status</h2>
                  <hr></hr>
                  <div>
                    {!this.state.isLoading ? (
                      <div>
                        {" "}
                        {this.state.user.ngoInquiry.map((item, index) => (
                          <p>
                            {" "}
                            <h4>
                              Donated by: {item.name} from {item.location}
                              <br />
                            </h4>
                          </p>
                        ))}{" "}
                      </div>
                    ) : (
                        <div>Loading..</div>
                      )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <Link to="/completedDeliveries">View completed Deliveries</Link> */}
        </section>
      </div>
    );
  }
}

export default completedDeliveries;

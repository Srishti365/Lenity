// import React from "react";
// import axios from "axios";
// import { Link, Redirect } from "react-router-dom";
// import LogHeader from "./LogHeader";

// class itemrequests extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       isLoading: true,
//       user: {},
//       isconfirm: false,
//       accepted: {},
//       received: {},
//       deliveryNotConfirmed: {},
//       requestor: "",
//       accepted: {},
//       id: "",
//       redirect: false
//     };
//     this.handleClick = this.handleClick.bind(this);
//   }

//   getRequests = async () => {
//     const res = await axios.get("http://localhost:8080/item/requests", {
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//         Authorization: localStorage.getItem("JWT_TOKEN")
//       }
//     });
//     console.log("response itemmmm", res.data);
//     this.setState(
//       {
//         accepted: res.data.accepted_requests,
//         received: res.data.received_requests,
//         isLoading: false
//       },
//       () => {
//         //console.log(this.state.user.email);
//         console.log(
//           "state now of your sent and accepted ---pay",
//           this.state.accepted
//         );
//         console.log("state now of new received req", this.state.received);

//         console.log(this.state.isLoading, "..state updated");
//       }
//     );
//   };

//   componentDidMount() {
//     this.getRequests();
//   }

//   handleClick = e => {
//     this.setState(state => ({
//       isconfirm: true
//     }));
//     console.log("value:::", e.target.value);
//     this.getConfirmation(e.target.value);
//   };
//   handleClick1 = e => {
//     this.setState(state => ({
//       isconfirm: true
//     }));
//     console.log("value:::", e.target.value);
//     this.getExecutive(e.target.value).then(() => {
//       this.setState(state => ({
//         redirect: true
//       }))
//     });
//   };

//   getConfirmation = async stringVar => {
//     const res = await axios.post(
//       "http://localhost:8080/item/requests",
//       { concat_vals: stringVar },
//       {
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json",
//           Authorization: localStorage.getItem("JWT_TOKEN")
//         }
//       }
//     );
//     console.log("res confirmation finalllyyyy:", res);
//   };

//   getExecutive = async id => {
//     const res = await axios.post(
//       "http://localhost:8080/item/requests",
//       { concat_vals: id },
//       {
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json",
//           Authorization: localStorage.getItem("JWT_TOKEN")
//         }
//       }
//     );
//     console.log("res confirmation youre paying:", res);
//   };

//   //      getDataAxios= async()=>{
//   //         console.log('jwt token',localStorage.getItem('JWT_TOKEN'));
//   //         const res =
//   //           await axios.get("http://localhost:8080/executive/dashboard",
//   //                           { headers:
//   //                     {
//   //                         Accept: 'application/json',
//   //                         'Content-Type': 'application/json',
//   //                         'Authorization': localStorage.getItem('JWT_TOKEN'),
//   //                           }
//   //                 }
//   // )
//   //         console.log("executive dashboard retun :",res.data);
//   //         this.setState({user:res.data.executive_data, isLoading: false }, () => {
//   //             //console.log(this.state.user.email);
//   //             console.log("state now",this.state.user)
//   //             console.log(this.state.isLoading, '..state updated');
//   //           });

//   //     }
//   // componentDidMount(){
//   //      this.getDataAxios();
//   //    }

//   //   componentDidUpdate(){
//   //     this.getDataAxios();
//   //   }

//   render() {
//     if (this.state.redirect) {
//       return <Redirect to="/payment"></Redirect>
//     }
//     return (
//       <div>
//         <LogHeader />
//         {!this.state.isLoading ? (
//           <div>
//             {" "}
//             {this.state.received.map((requests, index) => (
//               <p>
//                 Requested : {requests.item.user} for {requests.item.description}
//                 . Requested by:{requests.requestor}
//                 <button
//                   value={requests.item._id + "|" + requests.requestor + "|acc"}
//                   onClick={this.handleClick}
//                 >
//                   Accept Request
//                 </button>
//               </p>
//             ))}{" "}
//           </div>
//         ) : (
//             <div>Loading..</div>
//           )}
//         <Link to="/pendingrequest">View rquests you sent</Link>

//         {!this.state.isLoading ? (
//           <div>
//             {" "}
//             {this.state.accepted.map((accepted, index) => (
//               <p>
//                 your request to:, {accepted.item.user} ... {accepted.item._id}.{" "}
//                 <button
//                   value={accepted.item._id + "|" + accepted.requestor + "|pay"}
//                   onClick={this.handleClick1}
//                 >
//                   Pay and confirm
//                 </button>
//                 !
//               </p>
//             ))}{" "}
//           </div>
//         ) : (
//             <div>Loading..</div>
//           )}
//       </div>
//     );
//   }
// }

// export default itemrequests;


import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import LogHeader from "./LogHeader";
import '../css/itemrequests.css'

class itemrequests extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      user: {},
      isconfirm: false,
      accepted: {},
      received: {},
      deliveryNotConfirmed: {},
      requestor: "",
      accepted: {},
      id: ""
    };
    this.handleClick = this.handleClick.bind(this);
  }

  getRequests = async () => {
    const res = await axios.get("http://localhost:8080/item/requests", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("JWT_TOKEN")
      }
    });
    console.log("response itemmmm", res.data);
    this.setState(
      {
        accepted: res.data.accepted_requests,
        received: res.data.received_requests,
        isLoading: false
      },
      () => {
        //console.log(this.state.user.email);
        console.log(
          "state now of your sent and accepted ---pay",
          this.state.accepted
        );
        console.log("state now of new received req", this.state.received);

        console.log(this.state.isLoading, "..state updated");
      }
    );
  };

  componentDidMount() {
    this.getRequests();
  }

  handleClick = e => {
    this.setState(state => ({
      isconfirm: true
    }));
    console.log("value:::", e.target.value);
    this.getConfirmation(e.target.value);
    window.location.reload();
  };
  handleClick1 = e => {
    this.setState(state => ({
      isconfirm: true
    }));
    console.log("value:::", e.target.value);
    this.getExecutive(e.target.value);
  };

  getConfirmation = async stringVar => {
    const res = await axios.post(
      "http://localhost:8080/item/requests",
      { concat_vals: stringVar },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("JWT_TOKEN")
        }
      }
    );
    console.log("res confirmation finalllyyyy:", res);
  };

  getExecutive = async id => {
    const res = await axios.post(
      "http://localhost:8080/item/requests",
      { concat_vals: id },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("JWT_TOKEN")
        }
      }
    );
    console.log("res confirmation youre paying:", res);
  };

  //      getDataAxios= async()=>{
  //         console.log('jwt token',localStorage.getItem('JWT_TOKEN'));
  //         const res =
  //           await axios.get("http://localhost:8080/executive/dashboard",
  //                           { headers:
  //                     {
  //                         Accept: 'application/json',
  //                         'Content-Type': 'application/json',
  //                         'Authorization': localStorage.getItem('JWT_TOKEN'),
  //                           }
  //                 }
  // )
  //         console.log("executive dashboard retun :",res.data);
  //         this.setState({user:res.data.executive_data, isLoading: false }, () => {
  //             //console.log(this.state.user.email);
  //             console.log("state now",this.state.user)
  //             console.log(this.state.isLoading, '..state updated');
  //           });

  //     }
  // componentDidMount(){
  //      this.getDataAxios();
  //    }

  //   componentDidUpdate(){
  //     this.getDataAxios();
  //   }

  render() {
    return (
      <div>
        <LogHeader />
        {!this.state.isLoading ? (
          <div>
            {" "}
            <div class='requests-heading'><h3 class='requestsHeadingText'>Status of your requests</h3></div>
            <h1 class='acc-heading'>Received requests</h1>
            {/* <hr class='acc-hr'></hr> */}
            {this.state.received.map((requests, index) => (
              <p>
                {/* Requested : {requests.item.user} for {requests.item.description}
                . Requested by:{requests.requestor}
                <button
                  value={requests.item._id + "|" + requests.requestor + "|acc"}
                  onClick={this.handleClick}
                >
                  Accept Request
                </button> */}



                <section class="search-box">
                  <div class="container-fluid">
                    <div class="row">
                      <div class="col-md-10 listing-block">


                        <div class="media">

                          <div class="media-body pl-3">
                            <div class="price">{requests.requestor} has requested you for '{requests.item.description}'.</div>
                            <br></br>
                            <button
                              value={requests.item._id + "|" + requests.requestor + "|acc"}
                              onClick={this.handleClick}
                            >
                              Accept Request
                </button>


                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </section>
              </p>
            ))}{" "}
          </div>
        ) : (
            <div>Loading..</div>
          )}


        {!this.state.isLoading ? (
          <div>

            {" "}
            <br></br><br></br><br></br>
            <h1 class='acc-heading'>Accepted requests</h1>
            {/* <hr class='acc-hr'></hr> */}
            {this.state.accepted.map((accepted, index) => (
              <p>
                {/* your request to:, {accepted.item.user} ... {accepted.item._id}.{" "}
                <button
                  value={accepted.item._id + "|" + accepted.requestor + "|pay"}
                  onClick={this.handleClick1}
                >
                  Pay and confirm
                </button>
                ! */}




                <section class="search-box">
                  <div class="container-fluid">
                    <div class="row">
                      <div class="col-md-10 listing-block">


                        <div class="media">

                          <div class="media-body pl-3">
                            <div class="price">Your request to {accepted.item.user} for '{accepted.item.description}' has been accepted !</div>
                            <br></br>
                            <button
                              value={accepted.item._id + "|" + accepted.requestor + "|pay"}
                              onClick={this.handleClick1}
                            >
                              Pay and Confirm !
                </button>


                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </section>
              </p>
              ///trial code




              ///
            ))}{" "}
          </div>
        ) : (
            <div>Loading..</div>
          )}


      </div>
    );
  }
}

export default itemrequests;


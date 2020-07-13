import React from "react";
import axios from "axios";
import Donate from "./Donate";
import { Redirect } from "react-router";
import LogHeader from "./LogHeader";
import "../css/Header.css";
import logo from "./favicon.png";

class ItemDonate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: "",
      description: "",
      quantity: "",
      address: "",
      age: 0,
      res1: {},
      executiveAssigned: false,
      donation: {},
      executive: {}
    };
  }

  postEditData = async () => {
    const res = await axios
      .post(
        "http://localhost:8080/item",
        {
          quantity: this.state.quantity,
          description: this.state.description,
          category: this.state.category,
          age: this.state.age,
          address: this.state.address
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("JWT_TOKEN")
          }
        }
      )
      .then(res => {
        if (res.status === 200) {
          console.log(res);
          this.setState({ res1: res.data, executiveAssigned: true }, () => {
            console.log(this.state.res1, "..res1 updated");
            console.log("inceptionnn");
          });
        }
      });
  };
  //     getExecutive = async() =>{
  //         console.log('confirm res',this.state.res1);

  //         await axios.get("http://localhost:8080/home/food-donate/"+this.state.res1.name,
  //         { headers:
  //             {
  //                 Accept: 'application/json',
  //                 'Content-Type': 'application/json',
  //                 'Authorization': localStorage.getItem('JWT_TOKEN'),
  //                   }
  //         }
  //         ).then(res => {
  //             if (res.status === 200) {console.log(res);
  //               this.setState({ executiveAssigned: true, donation:res.data.donation,executive:res.data.executive1});
  //     }
  // })
  // }

  onFormSubmit = event => {
    event.preventDefault();
    console.log(this.state);
    this.postEditData();
  };
  render() {
    if (this.state.executiveAssigned) {
      return <Redirect to={{ pathname: "/dashboard" }} />;
    }



    return (
      <div className="itemcontainer">
        <LogHeader />
        <div className="container formcontainer1 border border-white">
          <img src={logo} /> DONATE ITEM
          <form onSubmit={this.onFormSubmit}>
            <br />
            <div className="form-group">
              Category:{" "}
              <input
                type="text"
                className="form-control"
                value={this.state.category}
                onChange={e => this.setState({ category: e.target.value })}
              />
            </div>
            <br />
            <div className="form-group">
              Description:{" "}
              <input
                type="text"
                className="form-control"
                value={this.state.description}
                onChange={e => this.setState({ description: e.target.value })}
              />
            </div>
            <br />
            <div className="form-group">
              Quantity:{" "}
              <input
                type="text"
                className="form-control"
                value={this.state.quantity}
                onChange={e => this.setState({ quantity: e.target.value })}
              />
            </div>
            <br />
            <div className="form-group">
              Age:{" "}
              <input
                type="text"
                className="form-control"
                value={this.state.age}
                onChange={e => this.setState({ age: e.target.value })}
              />
            </div>
            <br />
            <div className="form-group">
              address:{" "}
              <input
                type="text"
                className="form-control"
                value={this.state.address}
                onChange={e => this.setState({ address: e.target.value })}
              />
            </div>
            <br />

            <button type="submit" className="btn btn-outline-dark">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default ItemDonate;

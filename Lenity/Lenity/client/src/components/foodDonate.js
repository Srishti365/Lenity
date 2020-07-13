import React from "react";
import axios from "axios";
import Donate from "./Donate";
import { Redirect } from "react-router";
import LogHeader from "./LogHeader";
import "../css/Header.css";
import logo from "./favicon.png";

class foodDonate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      donatedBy: "",
      quantity: "",
      address: "",
      res1: {},
      executiveAssigned: false,
      donation: {},
      executive: {}
    };
  }

  postEditData = async () => {
    const res = await axios.post(
      "http://localhost:8080/home/food",
      {
        donatedBy: this.state.donatedBy,
        quantity: this.state.quantity,
        location: this.state.address
      },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("JWT_TOKEN")
        }
      }
    );
    console.log("res=", res);
    this.setState({ res1: res.data }, () => {
      console.log(this.state.res1, "..res1 updated");
      this.getExecutive();
      console.log("inceptionnn");
    });
  };
  getExecutive = async () => {
    console.log("confirm res", this.state.res1);

    await axios
      .get("http://localhost:8080/home/food-donate/" + this.state.res1.name, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("JWT_TOKEN")
        }
      })
      .then(res => {
        if (res.status === 200) {
          console.log(res);
          this.setState({
            executiveAssigned: true,
            donation: res.data.donation,
            executive: res.data.executive1
          });
        }
      });
  };

  onFormSubmit = event => {
    event.preventDefault();
    console.log(this.state);
    this.postEditData();
  };
  render() {
    if (this.state.executiveAssigned) {
      return (
        <Redirect
          to={{
            pathname: "/Donate",
            state: {
              executive: this.state.executive,
              donation: this.state.donation
            }
          }}
        />
      );
    }

    return (
      <div className="foodcontainer">
        <LogHeader />
        <div className="container formcontainer border border-white">
          <img src={logo} /> DONATE FOOD
          <form onSubmit={this.onFormSubmit}>
            <div className="form-group">
              Name:{" "}
              <input
                type="text"
                className="form-control"
                value={this.state.donatedBy}
                onChange={e => this.setState({ donatedBy: e.target.value })}
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

export default foodDonate;

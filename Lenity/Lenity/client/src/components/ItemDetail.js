import React from "react";
import axios from "axios";
import { Redirect } from "react-router";
import LogHeader from "./LogHeader";
import '../css/item.css';

const jwtToken = localStorage.getItem("JWT_TOKEN");

class ItemDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = { request: false };
  }

  handleClick = e => {
    console.log("id ==", e.target.value);
    this.getConfirmation(e.target.value);
    // this.setState(state => ({
    //   isconfirm: true
    // }));
  };

  getConfirmation = async x => {
    await axios
      .post(
        "http://localhost:8080/item/item-details",
        { id: x },
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
          this.setState({ request: true });
        }
      });
  };

  render() {
    console.log(this.props.location.state.requested);
    if (this.state.request) {
      return <Redirect to={{ pathname: "/Dashboard" }} />;
    }


    return (
      <div>
        <LogHeader />
        <div class="heading1"><h1>Item Details</h1></div>
        <div class="frame">
          <div class="center">

            <div class="profile">
              <div class="actions">
                <div class="name">
                  available to request: {this.props.location.state.requested}{" "}
                  {this.props.location.state.requested ? (
                    "unavailable"
                  ) : (
                      <button class="btn"
                        value={this.props.location.state.donation._id}
                        onClick={this.handleClick}
                        type="submit"
                      >
                        Request
            </button>
                    )}
                </div>
              </div>


            </div>

            <div class="stats">
              <div class="box">
                <span class="value">Description</span>
                <span class="parameter">{this.props.location.state.donation.description}</span>
              </div>
              <div class="box">
                <span class="value">Donated by</span>
                <span class="parameter">{this.props.location.state.donation.donatedBy}</span>
              </div>
              <div class="box">
                <span class="value">Address</span>
                <span class="parameter">{this.props.location.state.donation.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ItemDetail;

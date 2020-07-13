import React from 'react';
import axios from 'axios';
import LogHeader from './LogHeader';
import '../css/Header.css';
import logo from './favicon.png';
import { Redirect } from 'react-router';




class editProfile extends React.Component {
    state = { firstname: '', lastname: '', contactno: '', address: '', executiveAssigned: false };

    postEditData = async () => {
        await axios.post("http://localhost:8080/users/editProfile", {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            address: this.state.address,
            contactno: this.state.contactno
        },
            {
                headers:
                {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('JWT_TOKEN'),
                }
            }
        ).then(res => {
            if (res.status === 200) {
                console.log(res);
                this.setState({ executiveAssigned: true });
            }
        })
    }

    onFormSubmit = (event) => {
        event.preventDefault();
        console.log(this.state);
        this.postEditData();

    }
    render() {

        if (this.state.executiveAssigned) {
            return <Redirect to={{
                pathname: "/viewProfile"

            }} />;

        }

        return (
            <div className="itemcontainer">
                <LogHeader />
                <div className="container formcontainer1 border border-white">
                    <img src={logo} /> EDIT YOUR PROFILE
                <form onSubmit={this.onFormSubmit}>
                        <br />
                        <div className="form-group">
                            First Name:
                    <input
                                type="text"
                                className="form-control"
                                value={this.state.firstname}
                                onChange={e => this.setState({ firstname: e.target.value })}
                            />
                        </div>
                        <br />
                        <div className="form-group">
                            Last Name:
                    <input
                                type="text"
                                className="form-control"
                                value={this.state.lastname}
                                onChange={e => this.setState({ lastname: e.target.value })}
                            />
                        </div>
                        <br />
                        <div className="form-group">
                            Address:
                    <input
                                type="text"
                                className="form-control"
                                value={this.state.address}
                                onChange={e => this.setState({ address: e.target.value })}
                            />
                        </div>
                        <br />
                        <div className="form-group">
                            Contact No:
                    <input
                                type="text"
                                className="form-control"
                                value={this.state.contactno}
                                onChange={e => this.setState({ contactno: e.target.value })}
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

export default editProfile;
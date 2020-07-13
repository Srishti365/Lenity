import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import LogHeader from './LogHeader';
import image from "./images.png";
import '../css/Signin.css';

class viewProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            user: {}
        }

    }

    getDataAxios = async () => {
        console.log('jwt token', localStorage.getItem('JWT_TOKEN'));
        const res =
            await axios.get("http://localhost:8080/users/profile",
                {
                    headers:
                    {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': localStorage.getItem('JWT_TOKEN'),
                    }
                }
            )
        console.log(res.data);
        this.setState({ user: res.data.user, isLoading: false }, () => {
            console.log(this.state.isLoading, '..state updated');
        });


    }
    componentDidMount() {
        this.getDataAxios();
    }

    //   componentDidUpdate(){
    //     this.getDataAxios();
    //   }

    render() {

        return (
            <div className="container-fluid-project main"><LogHeader />
                <div><h1 class="user-profile">User Profile</h1></div>

                <div class="card" >

                    <img src={image} alt="" width="500px" height="300" />
                    {!this.state.isLoading ? <div><h1 class="username">{this.state.user.local.username}</h1>

                        <p class="title2">Email: {this.state.user.local.email}</p>
                        <p class="title2">{this.state.user.address}</p>
                        <p class="title2">{this.state.user.contactno}</p><br />

                        <Link to="/editprofile"><p > <button class="b1">Edit your profile</button></p></Link>

                    </div> : <div>Loading..</div>}</div>

            </div>


        );

    }

}

export default viewProfile;
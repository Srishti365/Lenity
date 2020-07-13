import React from 'react';
import {reduxForm, Field} from 'redux-form';
import CustomInput from './CustomInput';
import {connect} from 'react-redux';
import {compose} from 'redux';
import * as actions from '../actions';
import '../css/Signin.css';
import SignHeader from './SignHeader';
import logo from './favicon.png';

import GoogleLogin from 'react-google-login';


class SignIn extends React.Component{
    constructor(props){
        super(props);
        this.onSubmit=this.onSubmit.bind(this);
        this.responseGoogle=this.responseGoogle.bind(this);
    }

    async onSubmit(formData){
        console.log('onsubmit() got called');
        console.log('form data:',formData);
        await this.props.execsignIn(formData)
        if(!this.props.errorMessage){
            this.props.history.push('/execdashboard');

        }
    }

    async responseGoogle(res){
        console.log('responseGoogle',res);
        await this.props.oauthGoogle(res.accessToken);
        if(!this.props.errorMessage){
            this.props.history.push('/dashboard');
        }

    }

    render(){
            const {handleSubmit}=this.props;
        return(
        <div className="container-fluid main d-flex justify-content-center"><SignHeader/><div className="sign-in container-fluid border border-white">
            <div className="row title">
                <div className="col"><img src={logo}/>&nbsp;&nbsp;LENITY EXECUTIVE SIGN-IN</div>
            </div>
            <div className="row">
                <div className="col">
                <form onSubmit={handleSubmit(this.onSubmit)}>
                    
                    <fieldset>
                        <Field
                            name="email"
                            type="text"
                            id="email"
                            //label="enter your email"
                            placeholder="enter your email"
                            component={CustomInput}/>
                    </fieldset>
                    <fieldset>
                        <Field 
                        name="password"
                        type="password"
                        id="password"
                        //label="enter Password"
                        placeholder="password"
                           
                        component={CustomInput}/>

                    </fieldset>
                    
                    {this.props.errorMessage ? 
                    <div className="alert alert-danger">
                        {this.props.errorMessage}
                    </div>
                    : null}

                    <button className="btn btn-outline-dark" type="submit">SignIn</button>
                </form>
                </div></div>
                
                
                
                
                
                </div></div>
        
        );
    };

}

function mapStateToProps(state) {
    return{
        errorMessage:state.auth.errorMessage
    };
}

export default compose(
    connect(
        mapStateToProps,actions
    ),reduxForm({form:'signin'})

)(SignIn) ;
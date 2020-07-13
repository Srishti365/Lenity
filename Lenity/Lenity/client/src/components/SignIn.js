import React from 'react';
import {reduxForm, Field} from 'redux-form';
import CustomInput from './CustomInput';
import {connect} from 'react-redux';
import {compose} from 'redux';
import * as actions from '../actions';
import GoogleLogin from 'react-google-login';
import '../css/Signin.css';
import SignHeader from './SignHeader';
import logo from './favicon.png';




class SignIn extends React.Component{
    constructor(props){
        super(props);
        this.onSubmit=this.onSubmit.bind(this);
        //this.responseGoogle=this.responseGoogle.bind(this);
    }

    async onSubmit(formData){
        console.log('onsubmit() got called');
        console.log('form data:',formData);
        await this.props.signIn(formData)
        if(!this.props.errorMessage){
            this.props.history.push('/dashboard');

        }
    }

    // async responseGoogle(res){
    //     console.log('responseGoogle',res);
    //     await this.props.oauthGoogle(res.accessToken);
    //     if(!this.props.errorMessage){
    //         this.props.history.push('/dashboard');
    //     }

    // }

    render(){
        const {handleSubmit}=this.props;
        return(
        <div className="container-fluid main d-flex justify-content-center"><SignHeader/><div className="sign-in container-fluid border border-white">
            <div className="row title">
                <div className="col"><img src={logo}/>&nbsp;&nbsp;LENITY</div>
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
                </div>
                {/* <div className="col">
                    <div className="text-center">
                    <div className="alert alert-primary">Or signIn using third party services</div>
                    <GoogleLogin
                        clientId="683303475013-sgp831otcb90n65rcq5ivfek3kvnufjg.apps.googleusercontent.com"
                        buttonText="Google"
                        onSuccess={this.responseGoogle}
                        onFailure={this.responseGoogle}

                        className="btn btn-outline-danger"
                    />
                    <button className="btn btn-default">Facebook</button>
                </div>
                </div> */}
                </div>
                
                
                
                
                
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
import React from 'react';
import {reduxForm, Field} from 'redux-form';
import CustomInput from './CustomInput';
import {connect} from 'react-redux';
import {compose} from 'redux';
import * as actions from '../actions';


class Verify extends React.Component{
    constructor(props){
        super(props);
        this.onSubmit=this.onSubmit.bind(this);

    }


async onSubmit(formData){
    console.log('verify on submit called');
    console.log('secret token',formData);
    await this.props.verify(formData)
    if(!this.props.errorMessage){
        this.props.history.push('/signin');
    }

}

render(){
    const {handleSubmit}=this.props;
    return(
        <form onSubmit={handleSubmit(this.onSubmit)}>
            <fieldset>
                <Field name="secretToken"
                type="text"
                id="secretToken"
                component={CustomInput}/>
            </fieldset>
            <button type="submit">Verify and log in</button>
        </form>
    )
}
}

function mapStateToProps(state) {
    return{
        errorMessage:state.auth.errorMessage
    };
}

export default compose(
    connect(
        mapStateToProps,actions
    ),reduxForm({form:'verify'})

)(Verify) ;
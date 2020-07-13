import {AUTH_SIGN_UP, AUTH_ERROR, AUTH_SIGN_OUT,AUTH_SIGN_IN, AUTH_VERIFY} from '../actions/types';

const DEFAULT_STATE ={
    isAuthenticated:false,
    token:'',
    errorMessage:'',
    secretToken:''

}

export default (state=DEFAULT_STATE,action) =>{
    switch(action.type){
        case AUTH_SIGN_UP:
                console.log('[auth reducer] got auth sgnup action');

            return{...state, token:action.payload, isAuthenticated:false,errorMessage:''}
        case AUTH_VERIFY:
                console.log('verify reducer got action');
                return{...state, token:action.payload, isAuthenticated:true,errorMessage:''}

        case AUTH_SIGN_IN:
                console.log('[auth reducer] got auth signin action');

            return{...state, token:action.payload, isAuthenticated:true,errorMessage:''}
        
        case AUTH_SIGN_OUT:
            return{...state,token:action.payload,isAuthenticated:false,errorMessage:''}
        case AUTH_ERROR:
            return{...state, errorMessage:action.payload}
        default:
            return state

    }
    

}
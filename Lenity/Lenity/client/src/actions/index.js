import axios from 'axios';
import {AUTH_SIGN_UP, AUTH_ERROR, AUTH_SIGN_OUT, AUTH_SIGN_IN, AUTH_VERIFY} from './types';

export const oauthGoogle= data =>{
    return async dispatch =>{
        console.log('we received',data);
        const res=await axios.post('http://localhost:8080/users/oauth/google',{
            access_token:data
        });
        console.log('res',res)
        dispatch({
            type:AUTH_SIGN_UP,
            payload:res.data.token,
        });
        localStorage.setItem('JWT_TOKEN',res.data.token);
    };
}

export const signUp = (data) => {
    return async dispatch=> {
        try{
            console.log('[action creator] signup called');
            const res= await axios.post('http://localhost:8080/users/signup',data)
        console.log('res',res);
        console.log('[action creator] signup dispatched on action');
            dispatch({
                type:AUTH_SIGN_UP,
                payload:res.data.token
            });
            localStorage.setItem('JWT_TOKEN',res.data.token);
    }
            catch(err){
                dispatch({
                    type:AUTH_ERROR,
                    payload:'email already in use'
                })
            }
        }

    }

    export const signIn = (data) => {
        return async dispatch=> {
            try{
                console.log('[action creator] signup called');
                const res= await axios.post('http://localhost:8080/users/signin',data)
            console.log('res',res);
            console.log('[action creator] signin dispatched on action');
                dispatch({
                    type:AUTH_SIGN_IN,
                    payload:res.data.token
                });
                localStorage.setItem('JWT_TOKEN',res.data.token);
                localStorage.setItem('currentUser',JSON.stringify(res.data));
        }
                catch(err){
                    dispatch({
                        type:AUTH_ERROR,
                        payload:'email and password combination invalid'
                    })
                }
            }
    
        }

        export const execsignIn = (data) => {
            return async dispatch=> {
                try{
                    console.log('[action creator] exec signin called');
                    const res= await axios.post('http://localhost:8080/executive/signin',data)
                console.log('res',res);
                console.log('[action creator] exec signin dispatched on action');
                    dispatch({
                        type:AUTH_SIGN_IN,
                        payload:res.data.token
                    });
                    localStorage.setItem('JWT_TOKEN',res.data.token);
            }
                    catch(err){
                        dispatch({
                            type:AUTH_ERROR,
                            payload:'email and password combination invalid'
                        })
                    }
                }
        
            }
    

        export const verify = (data) => {
            return async dispatch=> {
                try{
                    console.log('data',data);
                    console.log('[action creator] verify called');
                    const res=await axios.post('http://localhost:8080/users/verify',data)
                console.log('[action creator] verify dispatched on action');
                console.log('res= ',res);
                    // dispatch({
                    //     type:AUTH_VERIFY,
                    //      payload:res.data.token
                    // });
            }
                    catch(err){
                         dispatch({
                            type:AUTH_ERROR,
                            payload:'email and password combination invalid'})
                        console.log('invalid token12');
                        
                    }
                }
        
            }
    

export const signOut = () => {
    return dispatch => {
        localStorage.removeItem('JWT_TOKEN');
        localStorage.removeItem('currentUser');
        console.log("localstorage:",localStorage);
        dispatch ({
            type:AUTH_SIGN_OUT,
            payload:''
        })


    };
}



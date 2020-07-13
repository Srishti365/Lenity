import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

class Pending extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isLoading:true,
            user: {},
            isconfirm:false,
            requests:{},
            requestor:'',
            id:''
        }
        this.handleClick = this.handleClick.bind(this);


    }

    getRequests=async ()=>{
        const res =
          await axios.get("http://localhost:8080/users/dashboard",
                          { headers: 
                    { 
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': localStorage.getItem('JWT_TOKEN'),
                          }
                }
)
        this.setState({requests:res.data.receivedRequests, isLoading: false }, () => {
    //console.log(this.state.user.email);
    console.log("state now",this.state.requests);
    console.log(this.state.isLoading, '..state updated');


    });
}

    componentDidMount(){
        this.getRequests();
    }

    handleClick=(e)=> {
        
        this.setState(state => ({
          isconfirm: true
        }));console.log('value:::',e.target.value);
        this.getConfirmation(e.target.value);
      }

    getConfirmation = async(stringVar) => {
        const res= 
        await axios.post("http://localhost:8080/users/dashboard",{stringVar:stringVar},
                          { headers: 
                    { 
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': localStorage.getItem('JWT_TOKEN'),
                          }
                }
)
console.log("res confirmation finalllyyyy:",res);

    }
    

     getDataAxios= async()=>{
        console.log('jwt token',localStorage.getItem('JWT_TOKEN'));
        const res =
          await axios.get("http://localhost:8080/executive/dashboard",
                          { headers: 
                    { 
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': localStorage.getItem('JWT_TOKEN'),
                          }
                }
)
        console.log("executive dashboard retun :",res.data);
        this.setState({user:res.data.executive_data, isLoading: false }, () => {
            //console.log(this.state.user.email);
            console.log("state now",this.state.user)
            console.log(this.state.isLoading, '..state updated');
          }); 
          

    }
    // componentDidMount(){
    //      this.getDataAxios();
    //    }
    
    //   componentDidUpdate(){
    //     this.getDataAxios();
    //   }

    
      
    render(){

        return(
         <div>{!this.state.isLoading ? <div>   {this.state.requests.map((requests, index) => (
         <p>Requested by:, {requests.requestor} of {requests.item._id} 

         
         
         
         . <button value={requests.item._id + '|' +requests.requestor } onClick={this.handleClick}>Confirm Delivery</button>!</p>
         ))}     </div>:<div>Loading..</div> }<Link to="/pendingrequest">View rquests you sent</Link></div>
        );

        
    }

}
        
            

   

export default Pending;
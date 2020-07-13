import React from 'react';
import axios from 'axios';
import Donate from './Donate';
import { Redirect } from 'react-router';
import LogHeader from './LogHeader';
import '../css/Home.css';
import '../css/style.css';
import '../css/Header.css';
import '../css/search.css'

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            category: '',
            location: '',
            address: '',
            res1: {},
            isLoading: true,
            executiveAssigned: false,
            donation: {},
            executive: {},
            itemClicked: false,
            requested: false



        }
    }

    postEditData = async () => {
        const res = await axios.post("http://localhost:8080/home", {
            category: this.state.category,
            location: this.state.location
        },
            {
                headers:
                {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('JWT_TOKEN'),
                }
            }
        )
        console.log('res=', res);
        this.setState({ res1: res.data, isLoading: false }, () => {
            console.log(this.state.res1, '..res1 updated');
            //this.getExecutive();
            //console.log("inceptionnn");
        });
    }
    getExecutive = async () => {
        console.log('confirm res', this.state.res1);



        await axios.get("http://localhost:8080/home/food-donate/" + this.state.res1.name,
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
                this.setState({ executiveAssigned: true, donation: res.data.donation, executive: res.data.executive1 });
            }
        })
    }

    getDetails = async (val) => {
        console.log('details of', val);




        await axios.get("http://localhost:8080/item/item-details?id=" + val,
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
                this.setState({ itemClicked: true, donation: res.data.donation, requested: res.data.requested })
                //this.setState({ executiveAssigned: true, donation:res.data.donation,executive:res.data.executive1});
            }
        })
    }

    handleClick = (e) => {
        console.log("id ==", e.target.value);
        this.getDetails(e.target.value);
        // this.setState(state => ({
        //   isconfirm: true
        // }));
        // window.location.reload();
    }




    onFormSubmit = (event) => {
        event.preventDefault();
        console.log(this.state);
        this.postEditData();
    }
    render() {
        if (this.state.itemClicked) {
            return <Redirect to={{
                pathname: "/ItemDetail",
                state: { donation: this.state.donation, requested: this.state.requested }
            }} />;

        }


        return (
            <div><LogHeader />
                <div class="heading"><h1 class='headingText'>Looking for something ?</h1><h3>We got you covered!</h3></div>
                <form className="form-inline search-form1" onSubmit={this.onFormSubmit}>
                    <div class="form-group mb-2">
                        Category: <input type="text"
                            className="form-control"
                            value={this.state.category}
                            onChange={e => this.setState({ category: e.target.value })}
                        /></div>
                    <div class="form-group mx-sm-4 mb-2">
                        Location:<input type="text"
                            className="form-control"
                            placeholder="Filter on basis of location"

                            value={this.state.location}
                            onChange={e => this.setState({ location: e.target.value })}
                        /></div>


                    <button type="submit" className="btn btn-outline-dark">Search</button>
                </form>

                <div><div>    <section class="event_part"><div className="container">

                    {!this.state.isLoading ? <div><h3 class='result'> Results</h3><hr class="result-hr"></hr> {this.state.res1.results.map((results, index) => (

                        //     <div class="card search">
                        //     <h5 class="card-header">Donated by: {results.donatedBy}</h5>
                        //     <div class="card-body">
                        //       <h5 class="card-title">{results._id}</h5>
                        //       <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                        //       <button onClick={this.handleClick} value={results._id} className="btn btn-outline-dark">View Details</button>
                        //     </div>
                        //   </div>

                        //<p>Id, {results._id}, donatd by : {results.donatedBy}...<button onClick={this.handleClick} value={results._id}>View Details</button>!</p>

                        /////Uncomment below       
                        <div className="row justify-content-center" >

                            {/* <div class="col-8">
                    <div class="single_event media">
                        <img src="img/event_1.png" class="align-self-center" alt="..."/>
                        <div class="tricker">10 Jun</div>
                        <div class="media-body align-self-center">
<h5 class="mt-0">{results.description}</h5>
<h5 class="mt-0">Category:{results.category}</h5>

<p className="donor">Donated by: {results.donatedBy}</p>
                            <ul>
                                <li><span id="days"></span>days</li>
                                <li><button onClick={this.handleClick} value={results._id} className="btn btn-outline-dark">View Details</button></li>
                                <li><span id="minutes"></span>Minutes</li>
                            </ul>
                        </div>
                    </div>
                </div> */}


                            <section class="search-box">
                                <div class="container-fluid">
                                    <div class="row">
                                        <div class="col-md-10 listing-block">


                                            <div class="media">

                                                <div class="media-body pl-3">
                                                    <div class="price">{results.description}</div>
                                                    <div class="address">Donated by: {results.donatedBy}</div>
                                                    <br></br>
                                                    <button onClick={this.handleClick} value={results._id} className="btn btn-outline-dark">View Details</button>
                                                    <div class="stats">

                                                        <span><i class="fa fa-tag"></i>{results.category}</span>

                                                    </div>

                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </section>




                        </div>


                        ////////////////////


                        ///////////////////


                    ))}     </div> : <div></div>}</div></section></div></div>

            </div>

            //Uncomment above
            ////////////

        );
    }
}

export default Search;
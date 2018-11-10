import React, { Component } from 'react';
// import { Route, Redirect } from 'react-router';
import ReturnJobs from '../returnedJobs/returnedJobs'
import logo from '../../../erecruit_logo.png'
import axios from 'axios';
import './searchBar.css'

class Search extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            searchQuery: '',
            placeValue:'',
            jobsData: []
        };

    }

    handleInputChange = () => {
        this.setState({
            searchQuery: this.search.value
        })
    }

    handlePlaceChange = () => {

        this.setState({
            placeValue: this.place.value
        })
    }

    handleSubmit = (event) => {

        event.preventDefault();
        let searchPosition = this.state.searchQuery;
        let searchLocation = this.state.placeValue;
        let responseData=[];

        axios.get('http://localhost:5000/jobs', {
            params: {
                type:searchPosition,
                location:searchLocation
            }
            })
            .then((response) => {
                //response.data = JSON.stringify(response.data);
                responseData = response.data.slice();
                this.setState({
                    jobsData: response.data
                })
            })
            .catch((error) => {
                console.log(error);
            })

        }

    // handleLogin = () =>{
    //      <Route path='/login' component={() => window.location = '\'http://localhost:5000'}/>
    // }
    render() {
        return (
            <div className="Home">
                <div className="headerContainer">
                    <div >
                        <img src={logo} className="logo" width='150'/>
                    </div>
                    <div className="loginButton">
                        {/*<button onClick={this.handleLogin}>Login/SignUp</button>*/}
                        </div>

                </div>

                <div className="searchBar">
                    <form method='get' onSubmit={this.handleSubmit}>

                        <div className='searchContainer'>

                            <div className="jobSearch" >
                                <input
                                    className="searchJobs"
                                    size="35"
                                    placeholder="Search for..."
                                    ref={input => this.search = input}
                                    onChange={this.handleInputChange}
                                />
                            </div>

                            <div className="searchLocation">
                            <input
                                className="SearchLocation"
                                size="35"
                                placeholder="Place..."
                                ref={input => this.place = input}
                                onChange={this.handlePlaceChange}
                            />
                            </div>

                            <div className="searchButton"><button className="button">Search</button></div>



                            {/*<p>{this.state.searchQuery}</p>*/}



                        </div>



                    </form>

                    <ReturnJobs data={this.state.jobsData} />

                </div>


            </div>
        )
    }
}

export default Search;
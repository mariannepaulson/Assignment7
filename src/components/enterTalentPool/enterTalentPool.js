import React, { Component} from "react";
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './enterTalentPool.css'
import logo from "../../../erecruit_logo.png";
import axios from "axios";
import { BrowserRouter as Router, Route , Redirect} from 'react-router-dom'

// import Search from "./searchBar";
//import background from '../../backgroundImg.jpg';

class EnterTalentPool extends Component{

    constructor (props) {
        super(props);
        this.state = {
            fields:{
                "firstName":"",
                "middleName" : "",
                "lastName":"",
                "phone": "",
                "email":"",
                "interest": ""

            },
            errors:{
                "firstName":"",
                "middleName" : "",
                "lastName":"",
                "phone": "",
                "email":"",
                "interest": ""
            }

        }
    }

    Inputvalidate =() =>
    {

        let firstName  = this.state.fields.firstName ? this.state.fields.firstName: "" ;
        let lastName  = this.state.fields.lastName ? this.state.fields.lastName: "" ;
        let phone = this.state.fields.phone ? this.state.fields.phone :"" ;
        let email = this.state.fields.email ? this.state.fields.email : "";
        let interest = this.state.fields.interest ? this.state.fields.interest : "";

        let errors = "";
        let errorObject = {}

        if (firstName === "") {
            //errors += "First name is required.\n";

            errorObject.firstName = "First name is required.\n";
            console.log("errorObject:", errorObject)
            this.setState({errors: errorObject});
        }

        if (lastName === "") {
            //errors += "Last name is required.\n";
            //let errorObject = {}
            errorObject.lastName = "Last name is required.\n";
            this.setState({errors: errorObject});

        }

        if (interest === "") {
            //errors += "Interest is required.\n";
           // let errorObject = {};
            errorObject.interest = "Interest is required.\n";
            this.setState({errors: errorObject});
        }

        let phoneRE = /^\(\d{3}\) *\d{3}-\d{4}$/;
        if (!phone.match(phoneRE)){
            //errors += "Invalid phone number. " +
                "Example: (999) 999-9999\n";

            //let errorObject = {};
            errorObject.phone = "Invalid phone number. " +
            "Example: (999) 999-9999\n";
            this.setState({errors: errorObject});

        }

        let emailRE = /^.+@.+\..{2,4}$/;
        if (!email.match(emailRE)){
            //errors += "Invalid email address. " +
                "Should be xxxxx@xxxxx.xxx\n";

            //let errorObject = {};
            errorObject.email = "Invalid email address. " +
                "Should be xxxxx@xxxxx.xxx\n"
            this.setState({errors: errorObject});
        }

        if (errors != "") {
            //alert(errors);
        }

        
    }

    handleInputChange(field, event) {

        let fields = this.state.fields;
        fields[field] = event.target.value;
        this.setState({fields});

        if(this.state.errors[field]) {

            console.log("I m trying to delete")

            delete this.state.errors[field];
        }

    }
    handleSubmit =(event) =>
    {
        event.preventDefault()

        console.log(this.state.fields)

        this.Inputvalidate();

        console.log("error", this.state.errors)

        let formData = JSON.stringify(this.state.fields);

        axios.post('http://localhost:5000/thankYou', formData)
            .then((response) => {
                //response.data = JSON.stringify(response.data);
                console.log(response.data);
                let correct = 0;

                console.log("errors in response", this.state.errors)

                Object.keys(this.state.errors).map((key)=> {

                    if (this.state.errors[key] != ""){

                        correct=correct +1;

                    }

                })

                if(correct === 0){

                    console.log("I am inside")

                    alert("Thank You ! Your data is submitted :)");

                }




                // return (
                //
                //     <div>
                //     <Router>
                //         <Route to={'/thankYou'}/>
                //     </Router>
                //
                //     </div>
                //
                // )

            })
            .catch((error) => {
               // console.log(error);
            });


}

    render(){
        return(
            <div className="talentPool">
                <div >
                    <img src={logo} className="logo" width='150'/>
                </div>
                <div className="loginButton">
                    {/*<button onClick={this.handleLogin}>Login/SignUp</button>*/}
                </div>

                <form onSubmit={this.handleSubmit}>
                    <fieldset>
                        <legend>Join Our Talent Pool</legend>
                        <label>First Name*:</label>
                        <input type="text"
                               ref="fistName"
                               onChange={this.handleInputChange.bind(this,"firstName")}
                               value={this.state.fields["firstName"]}
                               id="firstName"/>
                        <br/>
                        <span style={{color: "red"}}>{this.state.errors["firstName"] ? this.state.errors["firstName"] : "" }</span>
                        <br/>
                        <label>Middle Name:</label>
                        <input type="text"
                               ref="middleName"
                               onChange={this.handleInputChange.bind(this, "middleName")}
                               value={this.state.fields["middleName"]}
                               id="middleName"/>
                        {/*<span style={{color: "red"}}>{this.state.errors["middleName"]}</span>*/}

                        <label>Last Name*:</label>
                        <input type="text"
                               ref="lastName"
                               onChange={this.handleInputChange.bind(this, "lastName")}
                               value={this.state.fields["lastName"]}
                               id="lastName"/>
                        <br/>
                        <span style={{color: "red"}}>{this.state.errors["lastName"] ? this.state.errors["lastName"] :"" }</span>

                        <label>Phone number:</label>
                        <input type="text"
                               value="(nnn) nnn-nnnn"
                               onChange={this.handleInputChange.bind(this, "phone")}
                               value={this.state.fields["phone"]}
                               id="phone"/>
                        <br/>
                        <span style={{color: "red"}}>{this.state.errors["phone"] ? this.state.errors["phone"] : "" }</span>

                        <label>Email address:</label>
                        <input type="text"
                               value="xxxxx@xxxxx.xxx"
                               onChange={this.handleInputChange.bind(this, "email")}
                               value={this.state.fields["email"]}
                               id="email"/>
                        <br/>
                        <span style={{color: "red"}}>{this.state.errors["email"] ? this.state.errors["email"] : "" }</span>

                        <label>Jobs of Interest*:</label>
                        <input type="text"
                               onChange={this.handleInputChange.bind(this, "interest")}
                               value={this.state.fields["interest"]}
                               id="interest"/>
                        <span style={{color: "red"}}>{this.state.errors["interest"] ? this.state.errors["interest"] : "" }</span>
                        <br/>
                        <button>
                            Enter
                        </button>


                        <br/>
                    </fieldset>
                </form>
            </div>
        );
    }
}

export default EnterTalentPool;
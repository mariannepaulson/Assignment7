import React, { Component} from "react";
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
// import Search from "./searchBar";
import background from '../../../water.jpg';
//import background from '../../backgroundImg.jpg';

class Home extends Component{


    render(){
        return(
            <div className="homePage">
                <img src={background} className={"Back-image"} />
            </div>
        );
    }
}

export default Home;
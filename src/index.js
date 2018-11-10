import React from "react";
import ReactDOM from "react-dom";
import App from "./App.js";
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './components/home/homePage';
import Search from './components/searchBar/searchBar';
import "./index.css"
import EnterTalentPool from "./components/enterTalentPool/enterTalentPool";
import ThankYou from "./components/enterTalentPool/ThankYou";

ReactDOM.render(

    <Router>
        <div>
        <Route exact path="/" component={App} />
        <Route path="/search" component={Search} />
            <Route path="/talentpool" component={EnterTalentPool} />
            <Route path ='/thankYou' component={ThankYou}/>
            {/*<Route path="*" component={App} />*/}
        </div>

    </Router>,
    /*<App className = "indexClass"/>,*/
    document.getElementById("root")
);

if (module.hot) {
    module.hot.accept('./App', () => {
        //const App = require('./App').default;
        render(App);
    });
}
import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, browserHistory } from "react-router";

// import Routes from "./router";
import App from "./components/App/App";
import Character from "./components/Character/Character";

import "./css/styles.css";

document.addEventListener( "DOMContentLoaded", () => {
    const reactNode = document.getElementById( "react-node" );

    if ( reactNode ) {
        ReactDOM.render(
            <Router history={ browserHistory }>
        			<Route path="/" component={ App } />
        			<Route path="/characters/:id" component={ Character } />
        		</Router>
        , reactNode )
    }
} );

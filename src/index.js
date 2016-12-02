import React from "react";
import ReactDOM from "react-dom";

import "./css/styles.css"

document.addEventListener( "DOMContentLoaded", () => {
	const reactNode = document.getElementById( "react-node" );

    if ( reactNode ) {
        ReactDOM.render(
            <h1>Hello from index.js!</h1>
            , reactNode )
    }
} );

import React from "react";
import { browserHistory } from "react-router";

import { getPerson, setSelectedPerson } from "../../services/swapiService.js"

export default class Character extends React.Component {
	constructor( props ) {
		super( props );

		this.state = {
			person: {}
		}
	}

	componentWillMount() {
		console.log("hi")
		getPerson( this.props.params.id )
			.then( person => {
				setSelectedPerson( person.body );
				this.setState( { person: person.body } )
			} );
	}

	render() {
		const person = Object.keys( this.state.person ).map( key => (
			<li key={ key }>{ key }: { this.state.person[ key ] }</li>
		) );
		return (
			<div>
			<button onClick={browserHistory.goBack}>Back</button>
				<div>
					<h1>{ this.state.person.name }</h1>
					<ul>
						{ person }
					</ul>
				</div>

				<div>
					{ this.props.children }
				</div>

			</div>
		);
	}
}

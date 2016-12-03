import request from "superagent";

const baseUrl = "http://swapi.co/api/";
let selectedPerson = {};

export function getCharacters() {
	return request.get( baseUrl + "people" );
}

export function getPerson( id ) {
	return request.get( `${ baseUrl }people/${ id }` );
}

export function getShips( urlArray ) {
	const ships = [];
	return new Promise( ( resolve, reject ) => {
		for ( let i = 0; i < urlArray.length; i++ ) {
			request.get( urlArray[ i ] )
				.then( ship => {
					ships.push( ship );

					if ( ships.length >= urlArray.length ) {
						resolve( ships );
					}
				} );
		}
	} );
}

export function setSelectedPerson( person ) {
	selectedPerson = person;
}

export function getSelectedPerson() {
	return selectedPerson;
}

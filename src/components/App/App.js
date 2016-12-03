import React from "react";
import { Link } from "react-router";

import { getCharacters } from "../../services/swapiService.js";

export default class App extends React.Component {

  constructor() {
      super()
      this.state = {
      people: []
    }
  }

  componentWillMount() {
    //console.log("hi");
    getCharacters()
      .then( response => this.setState( { people: response.body.results } ) );
  }

  render() {
    const people = this.state.people
      .map( ( person, index ) => (
        <Link key={ index } to={ `/characters/${ index + 1 }` }>
          <li>{ person.name }</li>
        </Link>
      ) );
    return (
      <div>
        <h1>React Rogue One</h1>
        <ul>
          { people }
        </ul>
      </div>
    )
  }
}

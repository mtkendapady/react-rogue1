## React Rogue One

### Objectives
* Learning Objectives
* Understand the Life Cycle of a Components
* Understand how to use propTypes and getDefaultProps
* Understand what Mixins are and how they’re useful
* How to use React w/ jQuery and specifically to make Ajax requests

## Clone the Tutorial

```
git clone https://github.com/McKmillions/react-rogue1
cd react-rogue1
npm install
npm start
```

**Dev-Dependencies** ( `npm i --save-dev` )

`npm i webpack webpack-dev-server babel-core babel-preset-es2015 babel-preset-react babel-loader style-loader css-loader --save-dev`

* `webpack`
    * The module bundler we will be using as a build tool for this project.
    * If you haven't already, you will also want to install this globally ( `npm i webpack -g` )
* `webpack-dev-server`
    * A tool built for Webpack to allow live page reloads whenever a change is made.
    * If you haven't already, you will also want to install this globally ( `npm i webpack-dev-server -g` )
* `babel-core`
    * The core of Babel's parser
* `babel-preset-es2015`
    * A Babel preset allowing us to compile ES2015 to ES5
* `babel-preset-react`
    * A Babel preset allowing us to parse JSX
* `babel-loader`
    * Babel's Webpack plugin
* `style-loader`
* `css-loader`
    * These allow Webpack to handle our CSS as well as our JS

**Standard Dependencies** ( `npm i --save` )

* `react`
    * The core React library
* `react-dom`
    * The entry point of working with the DOM in React
* `react-router`
    * Keeps your UI in sync with the URL. Powerful features like lazy code loading, dynamic route matching, and location transition handling built right in.
* `superagent`
    * SuperAgent is a small progressive client-side HTTP request library, and Node.js module with the same API, sporting many high-level HTTP client features.

`npm i react react-dom --save`

**Checkpoint:** You should now be able to run `webpack-dev-server -d` and navigate a browser window to [http://localhost:8080](http://localhost:8080).

# Rendering a Route

At its heart, React Router is a component.

```js
render(<Router/>, document.getElementById('app'))
```

Inside `components` folder create a folder called App. Inside `App` folder create a file called App.js

Import react and create a class called App. Render this inside

```js
<div>
  <h1>React Rogue One</h1>
  <ul>
    <li>Hello from App.js!</li>
  </ul>
</div>
```

Your code should look something like this:
`src/components/App/App.js`
```js
import React from "react";

export default class App extends React.Component {

	render() {
    return (
      <div>
        <h1>React Rogue One</h1>
        <ul>
          <li>Hello from App.js!</li>
        </ul>
      </div>
    )
	}
}
```

Let's setup our routes:
Inside `index.js` import react, react-dom, `App` component, and your custom css stylesheet.

`src/index.js`
```js
import React from "react";
import ReactDOM from "react-dom";

import App from "./components/App/App";

import "./css/styles.css";
```

Next will setup the render with Routes.

Render a router onto the div with the id of `react-node`. The router should:

* Implement `browserHistory`
* Have a root route to the path `"/"` handled by the `App` component.

Your code should look something like this:

`src/index.js`
```js
import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, browserHistory } from "react-router";

import App from "./components/App/App";

import "./css/styles.css";

document.addEventListener( "DOMContentLoaded", () => {
  const reactNode = document.getElementById( "react-node" );

  if ( reactNode ) {
      ReactDOM.render(
          <Router history={ browserHistory }>
            <Route path="/" component={ App } />
          </Router>
      , reactNode )
  }
} );
```

Create a new components at:

- `components/Character/Character.js`

Now here comes the power of react-router

* Inside components create a folder called `Character` and then create a file `Character.js`. Import react and create a class called `Character`. Next render and return a single div with some text `Hello from Character!`

Your code should look something like this:

`components/Character/Character.js`
```js
import React from "react";

export default class Character extends React.Component {

	render() {
		return (
				<div>Hello from Character!</div>
		);
	}
}
```

* Inside `index.js` import the `Character` component and have a route to the path `"Character"` handled by the `Character` component.

Your code should look something like this:

`src/index.js`
```js
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
              <Route path="Character" component={ Character } />
            </Router>
        , reactNode )
    }
} );

```

# Navigating with Link

Let's get familiar with the component `Link`. It's similar to the `<a/>` tag. Except that `Link` is aware of the `Router` it was rendered in.

Let's create some navigation in our `App` component.

Import `Link` from `react-router` and inside the `<li>` create a link to `/` & `Character`

Your code should look something like this:

`./components/App/App.js`
```js
import React from "react";
import { Link } from "react-router";


export default class App extends React.Component {

	render() {
    return (
      <div>
        <h1>React Rogue One</h1>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="Character">Characters</Link></li>
        </ul>
      </div>
    )
	}
}
```

Our router is now set up and ready for use, we just need to configure each individual component to get the data necessary.

## Components Life Cycle's
* componentWillMount
  * Invoked once, both on the client and server, immediately before the initial rendering occurs.
* componentDidMount
  * Invoked once, only on the client (not on the server), immediately after the initial rendering occurs.
* componentWillReceiveProps
  * Invoked when a component is receiving new props. This method is not called for the initial render.
* componentWillUnmount
  * Invoked immediately before a component is unmounted from the DOM.
Perform any necessary cleanup in this method, clean up any DOM elements that were created in componentDidMount.

[React components lifecycle diagram](https://codepen.io/eduardoboucas/pen/jqWbdb).

Our `Character` component will display individual characters provided by `swapiService`.

* Inside `App.js` import `getCharacters` from `swapiService`.
* Using a lifecycle method, get the people and place them on state before the component mounts. Also go ahead and set up your constructor to set the initial state of people.

`./components/App/App.js`
```js
  constructor() {
    super();

    this.state = {
      people: []
    }
  }


	componentWillMount() {
		getCharacters()
			.then( response => this.setState( { people: response.body.results } ) );
	}
```

To set up the render with people create a variable just above the `return` called `people` and set it to `this.state.people`. Then `.map` over it. Inside the `.map` extract the `Link` from the return and paste it in here.

You'll need to set a key value on the `Link` to `index`
the path to will now be `to={ `/characters/${ index + 1 }` }`
In between the `Link` tags create a `<li>{ person.name }</li>`

Your code should look something like this:

`./components/App/App.js`
```js
const people = this.state.people
  .map( ( person, index ) => (
    <Link key={ index } to={ `/characters/${ index + 1 }` }>
      <li>{ person.name }</li>
    </Link>
  ) );
```

Inside the `return` render the array of `{ people }` inside the `<ul>`

Your final code should look something like this:

`./components/App/App.js`
```js
render() {
  const people = this.state.people
    .map( ( person, index ) => (
      <Link key={ index } to={ `/characters/${ index + 1 }` }>
        <li>{ person.name }</li>
      </Link>
    ) );

  return (
    <div>
      <ul>
        { people }
      </ul>
    </div>
  );
}
```

## Updating Character Component With Data

* Import `browserHistory` from `react-router`
* Import `getPerson` and `setSlectedPerson` from `../../services/swapiService.js`
* Add in the props constructor. Set state of person to an empty object
* Using a lifecycle method componentWillMount, pass in `this.props.params.id` into `getPerson` then we will set the state with the selected person. After the `getPerson()` use a `.then` with `setSelectedPerson` passing is `person.body` as a params. Then set the state `person` `person.body`

Your final code should look something like this:

`./components/Character/Character.js`
```js
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
		console.log(this.props.params.id);
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
```

To get the route to work we will need to hop into `index.js`

```js
<Router history={ browserHistory }>
  <Route path="/" component={ App } />
  <Route path="Character" component={ Character } />
</Router>
```

becomes:

```js
<Router history={ browserHistory }>
  <Route path="/" component={ App } />
  <Route path="/characters/:id" component={ Character } />
</Router>
```

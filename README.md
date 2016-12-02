## React Rogue One

### Objectives
* Learning Objectives
* Understand the Life Cycle of a Components
* Understand how to use propTypes and getDefaultProps
* Understand what Mixins are and how they’re useful
* How to use React w/ jQuery and specifically to make Ajax requests

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

**Checkpoint:** You should now be able to run `webpack-dev-server -d` and navigate a browser window to http://localhost:8080.

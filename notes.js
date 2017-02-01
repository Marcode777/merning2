// From the beginning. 
// include CDNs from unpkg as scripts in the head
// bare minimums are the react, react-dom and babel-core cdns
// the whole React Application will be placed in a div that you give an id to
// keep in mind that you are writing in JSX, text babel, so, if writing directly to html, put whatever in between <script type="text/babel"></script> tags

// or via create-react-app
//mkdir whatevername 
// cd into whatevername
// npm init
// npm install create-react-app --save
// create-react-app whatevername
// cd into whatevername that was just created

// *****************
//import React, { Component } from 'react';
// import './App.css'; 

// function Kolokoy(props) {     // so in this case the Kolokoy function will accept props and then return Welcome, and then whatever props
//   return <h1>Welcome, {props.name} {props.message}</h1>;
// }

// function App() { // in this case, the main function is App, it will produce the Kolokoy function, and then whatever is input for the name and message props will be produced as along with the Kolokoy function
//   return (
//     <div>
//      <Kolokoy name="Marco" message=" my message is Kokolokolokoyz"/>  
//     </div>
//   );
// }


// export default App;
// *****************
// **********
// also when using simple functions, exact syntax is important, e.g., use 
// function Say(props){
//     return <h3>I say that {props.says}</h3>;
//   }

//   instead of

// function Say(props){
//     return (
//     <h3>I say that {props.says}
//     </h3>;
//     )
//   }

// because remember, this is JSX, which is a derivative of JavaScript, which is more strict, but not exactly JavaScript which is less strict on syntax
// **********


// <!--* remember that React is in JSX, it uses JSX so that it's easier to understand at a high-level (meaning, it's easier to understand because it looks like HTML), JSX transpiles that easier-looking syntax back in to JavaScript. Remember that this means the entire React application is just JavaScript* 
//*******IT'S ALL ABOUT COMPONENTS, STATES AND PROPS, and remember that a render can only essentially display 1 parent element, if we want to render multiple parent elements, they have to be wrapped in a div. Remember to use ".bind(this)" when passing functions or methods around. Whenever we're binding a value, we'll also set up a change listener for that, so that it actually changes when the value changes. Also, css-like design elements with hyphens are camelCase in React JSX and should be made into a component, and then implemented, in order for them to function.*******
// ******FLUX is a pattern. CADS, Components, Actions, Dispatcher, Stores and it cycles again.******
// ******Remember, when listening to events on mount, to also unmount them to prevent memory leaks.******
// ***** React knows how to handle functions and classes. The simplest components in react are just like functions, 
// but the reason you'd want to use class is that it has access to component life cycles.*****
// *****props are actually just JavaScript objects that are converted by Babel and written in JSX, and are given as arguments, e.g. function MonsterList(props), so that way we have, available, props.monsters*****
// ***** also, the curly braces { }, in JSX means, between these curly braces, perform JavaScript. If you remove the curly braces, they would just get rendered straight as text.*****
// ***** componentWillMount() life cycle hook initializes the state of our app at the beginning*****




// From the start
// componentWillMount( ) life cycle hook gets called when we initialize the app, and it sets the initial state of our app::: this.state = {monsters}, this lives at the top-level
// we have our array of monsters ::: monsters: [{whatevermonsters with whatever key:value pairs}]
// this array of monsters is passed into the MonsterList component ::: <MonsterList monsters={this.state.monsters}/> 
// now the MonsterList component has an array of monsters and it maps through each element of that array via
//       function MonsterList(props){
//         return(
//             <ul className="list-group" key={monsters.id}>
//               {props.monsters.map(Monster)}
//             </ul>
//           );
//       }
// so for each element of that array, it passes each element through the Monster component above
// so the first time, the first iteration of map is going to pass the first element of the monsters array to the Monster 

// and so now that element (or object in this case, because it has key-value pairs), will have specific props (key:value pairs) extracted from it as in the following
//      function Monster(props){
//        return <h3>{props.nickname} {props.type} {props.id} </h3>
//       };
//
//in turn those specific props will be returned within the tags to be displayed, as in the case of the first element, nickname Jersey Devil and type American will be displayed
//
// PART 1 IS INTRODUCING A FULLY CLIENT-SIDE IMPLEMENTATION JUST USING THE R IN OUR MERN STACK, THIS IS EVERYTHING PRIOR TO 25:11

// PART 2 FOR EXPRESS AND NODE SERVER STARTS AT 25:11
// monsters array moved from front end (index.html) to server (app.js)
// class App now has constructor and also a this.state that equals an empty array of monsters, added before the componentWillMount() life cycle hook component
// also componentWillMount() now has fetch ();
// handleAddMonster() has now also been modified, it's the same function call, however, we've change the internals to use fetch ()

// mention at 33:33 how the scripts in a deployed application might work
// for scripts start, I used my own way out of necessity because 

// PART 3, THE LAST AND MOST GLORIOUS STEP: UTILIZING MONGODB STARTS AT 35:47
// install MongoDB
// We've reduced our application to a very straightforward, simple index.html, where we're now requesting a static asset from our server
// we're no longer embedding the entire application, we can now use a bundle like webpack.config.js and it's in some sort of a distribution folder
// a lot has remained unchanged, in our client side app, it's just been moved to a dedicated javascript folder, such as assets, and inside is a client.js file
// you can tell that our components have remained unchanged, we're still requesting data from our server and posting data to our server
// but we've added more to our node server, we've also installed mongoose
// also we are using app.use('/assets') 
// we are have added using app.get('/monsters') with a MongoDB find command to the original app.get('/monsters')
// and we have addes some changes to app.post('/monsters')
// keep in mind that MongoDB will automatically provide a unique ID to each item added

//There is an unexpected error here. Is it because I am not using webpack to bundle it?
// I THINK IT HAS SOMETHING TO DO WITH THE TYPE SCRIPT IN THE SCRIPT TAG IN THE HTML: <script type="text/babel" src="assets/client.js"></script>
// *FIGURED IT OUT WITH THE HELP OF AN EMAIL FROM THE VENERABLE ANDREW HANSEN HIMSELF, THE ORIGINATOR OF THE VERY TUTORIAL HIMSELF!*
          // It seems there is an issue in your express config where node cannot find your assets folder. This line:

          // `app.use(function(req, res){
          //   res.sendFile(__dirname + '/index.html');
          // });`

          // Says "as a fallback, default to sending index.html if something is requested that isn't recognized"

          // So when the browser is requesting assets/client.js, your server is sending the default file: index.html.

          // I would make sure that this line is behaving correctly. :

          // `app.use('/assets', express.static(path.resolve('merning2/assets'), {maxAge: '30 days'}));`

          // you'll notice in my source code for this tutorial, I have a package.json script that declares where Node should look to resolve files.

          // https://github.com/arahansen/mern-tutorial/blob/master/package.json#L13

          // Hope this helps!

          // -Andrew


//     it has to do with the app.js and specifically the line of 
//       app.use(function(req, res){
//         res.sendFile(__dirname + '/index.html');
//       });
//  so, '/index.html' was changed to '/assets/client.js' and the errors were cleared and something was being able to be served.
// this is because clearly, in the index.html file, the <script type="text/babel" src="assets/client.js"></script>, clearly states that the src="assets/clients.js"

//THE WHOLE THING FINISHES AT 45:07



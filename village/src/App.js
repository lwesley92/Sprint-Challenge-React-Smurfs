import React, { Component } from 'react';
import axios from 'axios'; 
import './App.css';
import SmurfForm from './components/SmurfForm';
import Smurfs from './components/Smurfs';
import { Route, Link } from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: [],
    };
  }
  // add any needed code to ensure that the smurfs collection exists on state and it has data coming from the server
  // Notice what your map function is looping over and returning inside of Smurfs.
  // You'll need to make sure you have the right properties on state and pass them down to props.
  componentDidMount() {
    axios
    .get('http://localhost:3333/smurfs')
    .then(response => {
      this.setState({smurfs: response.data});
    })
    .catch(err=>console.log(err));
  } 

  newSmurf=(smurf)=> {
    axios 
    .post('http://localhost:3333/smurfs', smurf) 
    .then(response => {
      this.setState({smurfs: response.data});
    }) 
    .catch(err=>console.log(err)); 
  } 


  render() {
    return (
      <div className="App">
      <header>
        <Link exact to = '/' >Enter the Village</Link>
        <Link to = '/smurf-form/' >Add a Smurf</Link>
      </header> 
      <Route 
        path = '/smurf-form'
        render = {(props) =>
          <SmurfForm 
            {...props}
            newSmurf = {this.newSmurf}
          />}
       />
       <Route 
        exact path = '/'
        render = {(props) =>
          <Smurfs
            {...props}
            smurfs = {this.state.smurfs}
          />}
       />
      </div>
    );
  }
}

export default App;
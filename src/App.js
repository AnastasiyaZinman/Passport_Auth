import React, { Component } from 'react';
import axios from 'axios'
import { Route, Link } from 'react-router-dom'
import LoginForm from './components/login'
import Navbar from './components/navbar'
import Home from './components/home'
import Statistics from './components/statistics.js'
import Registration from './components/registration'

class App extends Component {
  constructor() {
    super()
    this.state = {
      loggedIn: false 
    } 
  }

  componentDidMount = ()=> {
    this.getUser()
    //Check user at loading time
  }

  updateUser = (userObject) =>{
    this.setState(userObject)
  }

  getUser = ()=>{
    //Check if there are user details in session and pass data by state
    
    axios.get('/user/', {
      headers: {
        'Authorization': "Bearer " + localStorage.getItem('token'),
      }
    }).then(response => { 
      // console.log(response) 
      if (response.data.username) {
        console.log('Yes ') 
        this.updateUser({
          loggedIn: true 
        })
      } else {
        console.log('No user');
        this.updateUser({
          loggedIn: false 
        })
      }
    })
  }

  logout = (event)=>{
    //Post to logout and update state
    localStorage.clear();
    event.preventDefault()
    axios.post('/user/logout').then(response => {
        if (response.status === 200) {
            this.updateUser({
                loggedIn: false 
            })
        }
    }).catch(error => {
        console.log('Logout error')
    })
}

  render() {
    //Pass state and logout function
    return (
      <div className="App">
        <Navbar logout={this.logout} loggedIn={this.state.loggedIn} />  
        <Route exact path="/" component={Home} />
        <Route path="/signup" render={() => <Registration updateUser={this.updateUser} />}/>
        <Route path="/login" render={() => <LoginForm updateUser={this.updateUser} />}/>
        <Route path="/mainDashBoard" render={() => <Statistics />}/> 
      </div>
    );
  }
}

export default App;

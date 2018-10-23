import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobe} from '@fortawesome/free-solid-svg-icons'
// import axios from 'axios';
class Registration extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: ''
        }
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    sendNewAccountData =()=>{
      console.log("user",this.state.username,"password",this.state.password);
      this.clearInputs();
    }
    clearInputs(){
        this.setState({username:"",password:""});
    }
    getInputs() {
       return(<div>
           <h2>Registration</h2>
           <FontAwesomeIcon style={{ color: "blue" }}className="fas" icon={ faGlobe} size="6x"/>
            <label>
                Name:
        <input type="text" type="text" id="username" name="username" placeholder="Username" value={this.state.username} onChange={this.handleChange} />
            </label><br/>
            <label>
                password:
        <input type="password" type="password" id="password" name="password" placeholder="password" value={this.state.password} onChange={this.handleChange} />
            </label>
            <button type="button" onClick={this.sendNewAccountData}>Registration</button>
        </div>)
    }
    render() {
        return (
            <div>
                {this.getInputs()}
            </div>
        )

    }
}

export default Registration

import React, { Component } from 'react';

class Form extends Component {

  state = {
    username: "",
    password: ""
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.handleSubmit(this.state)
  }

  handleChange = (e) => {
    let {name, value} = e.target
    this.setState({
      [name]: value
    })
  }

  render() {
    let {formName} = this.props
    let {username, password} = this.state

    return (
      <>
      <br/>
      <form className='login' onSubmit={this.handleSubmit}>
        <h1>{formName}</h1>
        <label htmlFor="username">Username:</label>
        <input type="text" autoComplete="off" 
          name="username"
          placeholder="Username" 
          value={username} 
          onChange={this.handleChange}
          /><br/>
        <label htmlFor="password">Password:</label>
        <input type="password" autoComplete="off" 
          name="password"
          placeholder="Password" 
          value={password} 
          onChange={this.handleChange}
        /><br/>
        <input className='blue-button' type="submit" value="Submit"/>
      </form>
      </>
    );
  }

}

export default Form;
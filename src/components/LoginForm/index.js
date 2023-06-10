import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    usernameError: false,
    passwordError: false,
    submitError: false,
    errorMsg: '',
  }

  onSubmitSuccess = token => {
    const {history} = this.props
    Cookies.set('jwt_token', token, {expires: 1})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({submitError: true, errorMsg})
  }

  onFormSubmit = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userLoginDetails = {username, password}
    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userLoginDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onBlurUsernameCheck = () => {
    const {username} = this.state
    if (username === '') {
      this.setState({usernameError: true})
    } else {
      this.setState({usernameError: false})
    }
  }

  onBlurPasswordCheck = () => {
    const {password} = this.state
    if (password === '') {
      this.setState({passwordError: true})
    } else {
      this.setState({passwordError: false})
    }
  }

  getUsernameValue = event => {
    this.setState({username: event.target.value})
  }

  getPasswordValue = event => {
    this.setState({password: event.target.value})
  }

  getUsernameContainer = () => {
    const {username, usernameError} = this.state
    return (
      <div className="inputContainer">
        <label htmlFor="username" className="loginLabel">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          className="inputBox"
          value={username}
          placeholder="Username"
          onChange={this.getUsernameValue}
          onBlur={this.onBlurUsernameCheck}
        />
        {usernameError && <p className="errorMsg">*Required</p>}
      </div>
    )
  }

  getPasswordContainer = () => {
    const {password, passwordError} = this.state
    return (
      <div className="inputContainer">
        <label htmlFor="password" className="loginLabel">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          className="inputBox"
          value={password}
          placeholder="Password"
          onChange={this.getPasswordValue}
          onBlur={this.onBlurPasswordCheck}
        />
        {passwordError && <p className="errorMsg">*Required</p>}
      </div>
    )
  }

  render() {
    const {submitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="main">
        <div className="loginCard">
          <img
            className="websiteLogo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
          <div className="formContainer">
            <form onSubmit={this.onFormSubmit}>
              {this.getUsernameContainer()}
              {this.getPasswordContainer()}
              <div className="loginBtnContainer">
                <button
                  type="submit"
                  className="loginBtn"
                  onClick={this.onLoginClick}
                >
                  Login
                </button>
                {submitError && <p className="errorMsg">*{errorMsg}</p>}
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default LoginForm

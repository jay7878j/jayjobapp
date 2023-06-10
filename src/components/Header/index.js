import './index.css'
import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'

const Header = props => {
  const onLogoutClick = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <nav className="navBarContainer">
      <Link to="/">
        <img
          className="websiteLogo"
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
        />
      </Link>
      <ul className="navLinkContainer">
        <Link to="/" className="navLink">
          <li className="navListItemEl">HOME</li>
        </Link>
        <Link to="/jobs" className="navLink">
          <li className="navListItemEl">JOBS</li>
        </Link>
      </ul>
      <button className="logoutBtn" type="button" onClick={onLogoutClick}>
        Logout
      </button>
    </nav>
  )
}

export default withRouter(Header)

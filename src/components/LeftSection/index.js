import {Component} from 'react'
import {Link} from 'react-router-dom'
import './index.css'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

const apiStatusConstraints = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class LeftSection extends Component {
  state = {
    apiStatus: apiStatusConstraints.initial,
    profileDetails: {},
  }

  componentDidMount() {
    this.getProfileData()
  }

  getProfileData = async () => {
    this.setState({apiStatus: apiStatusConstraints.inProgress})

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)

    if (response.ok) {
      const data = await response.json()
      const formatData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      // console.log(formatData)
      this.setState({
        apiStatus: apiStatusConstraints.success,
        profileDetails: formatData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstraints.failure})
    }
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderSuccessView = () => {
    const {profileDetails} = this.state
    const {name, profileImageUrl, shortBio} = profileDetails
    return (
      <div className="profileContainer">
        <img className="profileImg" src={profileImageUrl} alt="profile" />
        <h1 className="profileNameHeading">{name}</h1>
        <p className="profileBioPara">{shortBio}</p>
      </div>
    )
  }

  renderFailure = () => (
    <div className="profileRetryContainer">
      <Link to="/jobs">
        <button
          className="retryBtn"
          type="button"
          onClick={this.onRetryBtnClick}
        >
          Retry
        </button>
      </Link>
    </div>
  )

  getRenderViews = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstraints.inProgress:
        return this.renderLoadingView()
      case apiStatusConstraints.success:
        return this.renderSuccessView()
      case apiStatusConstraints.failure:
        return this.renderFailure()
      default:
        return null
    }
  }

  getEmploymentList = list => (
    <ul className="leftSectionListContainer">
      {list.map(eachItem => (
        <li className="listItemEl" key={eachItem.employmentTypeId}>
          <input
            type="checkbox"
            id={eachItem.employmentTypeId}
            className="checkbox"
          />
          <label htmlFor={eachItem.employmentTypeId} className="label">
            {eachItem.label}
          </label>
        </li>
      ))}
    </ul>
  )

  getSalaryRangeList = list => (
    <ul className="leftSectionListContainer">
      {list.map(eachItem => (
        <li className="listItemEl" key={eachItem.salaryRangeId}>
          <input
            type="radio"
            id={eachItem.salaryRangeId}
            className="checkbox"
            name="salaryRange"
          />
          <label htmlFor={eachItem.salaryRangeId} className="label">
            {eachItem.label}
          </label>
        </li>
      ))}
    </ul>
  )

  render() {
    const {employmentTypesList, salaryRangesList} = this.props

    return (
      <div className="leftSectionContainer">
        {this.getRenderViews()}
        <hr className="hrLine" />
        <div className="employmentContainer">
          <h1 className="leftHeading">Type of Employment</h1>
          {this.getEmploymentList(employmentTypesList)}
        </div>
        <hr className="hrLine" />
        <div className="salaryRangeContainer">
          <h1 className="leftHeading">Salary Range</h1>
          {this.getSalaryRangeList(salaryRangesList)}
        </div>
      </div>
    )
  }
}

export default LeftSection

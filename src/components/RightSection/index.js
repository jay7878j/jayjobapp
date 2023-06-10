import {Component} from 'react'
import {Link} from 'react-router-dom'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import JobItem from '../JobItem'

import './index.css'

const apiStatusConstraints = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class RightSection extends Component {
  state = {
    apiStatus: apiStatusConstraints.initial,
    jobsDetailsList: [],
    searchInput: '',
  }

  componentDidMount() {
    this.getJobDetailsData()
  }

  getJobDetailsData = async () => {
    this.setState({apiStatus: apiStatusConstraints.inProgress})
    const {searchInput} = this.state

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs?search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    console.log(response)

    if (response.ok) {
      const data = await response.json()
      const formatData = data.jobs.map(eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        id: eachItem.id,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        packagePerAnnum: eachItem.package_per_annum,
        rating: eachItem.rating,
        title: eachItem.title,
      }))

      this.setState({
        apiStatus: apiStatusConstraints.success,
        jobsDetailsList: formatData,
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

  renderFailureView = () => {
    const failureImgUrl =
      'https://assets.ccbp.in/frontend/react-js/failure-img.png'

    return (
      <div className="failureContainer">
        <img className="failureImg" src={failureImgUrl} alt="" />
        <h1 className="failureHeading">Oops! Something Went Wrong</h1>
        <p className="failurePara">
          We cannot seem to find the pge you are looking for.
        </p>
        <Link to="/jobs">
          <button className="retryBtn" type="button">
            Retry
          </button>
        </Link>
      </div>
    )
  }

  renderSuccessView = () => {
    const {jobsDetailsList} = this.state
    if (jobsDetailsList.length > 0) {
      return (
        <ul className="jobListContainer">
          {jobsDetailsList.map(eachItem => (
            <JobItem list={eachItem} key={eachItem.id} />
          ))}
        </ul>
      )
    }
    return this.getNoResultsFound()
  }

  getRenderViews = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstraints.inProgress:
        return this.renderLoadingView()
      case apiStatusConstraints.failure:
        return this.renderFailureView()
      case apiStatusConstraints.success:
        return this.renderSuccessView()

      default:
        return null
    }
  }

  getUserInput = event => {
    this.setState({searchInput: event.target.value})
  }

  getNoResultsFound = () => (
    <div className="noResultsContainer">
      <img
        className="noResultImg"
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
      />
      <h1 className="noResultHeading">No Jobs Found</h1>
      <p className="noResultPara">
        We could not find any jobs. Try other filters.
      </p>
    </div>
  )

  onSearchBtnClick = () => {
    const {searchInput} = this.state

    this.setState({searchInput}, this.getJobDetailsData)
  }

  onEnterClick = event => {
    const {searchInput} = this.state
    if (event.key === 'Enter') {
      this.setState({searchInput}, this.getJobDetailsData)
    }
  }

  render() {
    const {searchInput, jobsDetailsList} = this.state
    return (
      <div className="rightSectionContainer">
        <div className="searchContainer">
          <input
            type="search"
            value={searchInput}
            placeholder="Search"
            className="searchBar"
            onChange={this.getUserInput}
            onKeyDown={this.onEnterClick}
          />
          <button
            type="button"
            data-testid="searchButton"
            className="searchBtn"
            onClick={this.onSearchBtnClick}
          >
            <BsSearch className="search-icon" size="22" />
          </button>
        </div>
        <div className="jobsProfileContainer">{this.getRenderViews()}</div>
      </div>
    )
  }
}

export default RightSection

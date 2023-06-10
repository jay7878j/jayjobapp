import {Component} from 'react'
import {BsFillStarFill} from 'react-icons/bs'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import JobInfo from '../JobInfo/index'

import './index.css'
import Header from '../Header'

const apiStatusConstraints = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    apiStatus: apiStatusConstraints.initial,
    jobInfoDetails: [],
  }

  componentDidMount() {
    this.getJobInfo()
  }

  getJobInfo = async () => {
    this.setState({apiStatus: apiStatusConstraints.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params

    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    // console.log(data)
    const formatData = {
      jobDetails: {
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        id: data.job_details.id,
        jobDescription: data.job_details.job_description,
        lifeAtCompany: {
          description: data.job_details.life_at_company.description,
          imageUrl: data.job_details.life_at_company.image_url,
        },
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
        skills: data.job_details.skills.map(eachItem => ({
          imageUrl: eachItem.image_url,
          name: eachItem.name,
        })),
        title: data.job_details.title,
      },
      similarJobs: data.similar_jobs.map(eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        id: eachItem.id,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        rating: eachItem.rating,
        title: eachItem.title,
      })),
    }

    // console.log(formatData)
    if (response.ok) {
      this.setState({
        apiStatus: apiStatusConstraints.success,
        jobInfoDetails: formatData,
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
    const failureImgUrl = ''

    return (
      <div className="failureContainer">
        <img className="failureImg" src={failureImgUrl} alt="" />
        <h1 className="failureHeading">Oops! Something Went Wrong</h1>
        <p className="failurePara">
          We cannot seem to find the pge you are looking for.
        </p>
        <Link to="/jobs/:id">
          <button className="retryBtn" type="button">
            Retry
          </button>
        </Link>
      </div>
    )
  }

  renderSuccessView = () => {
    const {jobInfoDetails} = this.state
    const {jobDetails, similarJobs} = jobInfoDetails
    return (
      <div className="jobCard1">
        <div className="jobCard">
          <JobInfo jobDetails={jobDetails} similarJobs={similarJobs} />
        </div>
        <div className="similarJobContainer">
          <h1 className="heading">Similar Jobs</h1>
          <ul className="similarJobsListContainer">
            {similarJobs.map(eachItem => (
              <li className="similarListItemEl">
                <div className="similarJobInfoContainer">
                  <img
                    className="similarJobImg"
                    src={eachItem.companyLogoUrl}
                    alt=""
                  />
                  <div className="similarJobTitleContainer">
                    <h1 className="similarJobTitleHeading">{eachItem.title}</h1>
                    <div className="similarRatingContainer">
                      <BsFillStarFill />
                      <p className="ratingPara">{eachItem.rating}</p>
                    </div>
                  </div>
                </div>
                <h1 className="similarDescHeading">Description</h1>
                <p className="similarDescPara">{eachItem.jobDescription}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }

  getRenderViews = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstraints.inProgress:
        return this.renderLoadingView()
      case apiStatusConstraints.success:
        return this.renderSuccessView()
      case apiStatusConstraints.failure:
        return this.renderFailureView()

      default:
        return null
    }
  }

  render() {
    const {jobInfoDetails} = this.state
    const {jobDetails} = jobInfoDetails
    // console.log(jobDetails)
    // const {companyLogoUrl} = jobDetails

    return (
      <div className="jobInfoContainer">
        <Header />
        {this.getRenderViews()}
      </div>
    )
  }
}

export default JobItemDetails

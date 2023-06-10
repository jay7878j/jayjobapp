import {Link} from 'react-router-dom'
// import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill, BsFillStarFill} from 'react-icons/bs'

import './index.css'

const JobItem = props => {
  const {list} = props
  const {
    companyLogoUrl,
    id,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = list

  return (
    <Link to={`/jobs/${id}`} className="jobLinkItem">
      <li className="jobListItemEl">
        <div className="companyProfileContainer">
          <img className="companyLogo" src={companyLogoUrl} alt="company" />
          <div className="jobTitlesContainer">
            <h1 className="jobTitleHeading">{title}</h1>
            <div className="ratingContainer">
              <BsFillStarFill color="yellow" size="15" />
              <p className="ratingPara">{rating}</p>
            </div>
          </div>
        </div>
        <div className="locationAndPackageContainer">
          <div className="locationAndJobType">
            <div className="locationContainer">
              <MdLocationOn size="16" />
              <p className="para">{location}</p>
            </div>
            <div className="locationContainer">
              <BsFillBriefcaseFill size="16" />
              <p className="para">{employmentType}</p>
            </div>
          </div>
          <p className="para package">{packagePerAnnum}</p>
        </div>
        <hr />
        <h1 className="jobDescHeading">Description</h1>
        <p className="descPara">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobItem

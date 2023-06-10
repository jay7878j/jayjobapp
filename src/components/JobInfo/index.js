import {MdLocationOn} from 'react-icons/md'
import {HiExternalLink} from 'react-icons/hi'
import {BsFillBriefcaseFill, BsFillStarFill} from 'react-icons/bs'

import './index.css'

const JobInfo = props => {
  const {jobDetails, similarJobs} = props
  const {
    companyLogoUrl,
    companyWebsiteUrl,
    employmentType,
    lifeAtCompany,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
    skills,
  } = jobDetails

  return (
    <>
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
        <p className="para">{packagePerAnnum}</p>
      </div>
      <hr />
      <div className="jobInfoDescContainer">
        <h1 className="jobDescHeading">Description</h1>
        <div className="visitContainer">
          <a className="anchorLink" href={companyWebsiteUrl}>
            Visit
          </a>
          <HiExternalLink size="20" />
        </div>
      </div>
      <p className="descPara">{jobDescription}</p>
      <div className="skillsContainer">
        <h1 className="heading">Skills</h1>
        <ul className="skillsListContainer">
          {skills.map(eachSkill => (
            <li className="skillListEl">
              <img src={eachSkill.imageUrl} className="skillLogo" alt="" />
              <h1 className="skillHeading">{eachSkill.name}</h1>
            </li>
          ))}
        </ul>
      </div>
      <div className="lifeAtCompanyContainer">
        <h1 className="heading">Life at Company </h1>
        <div className="companyContentContainer">
          <p className="companyInfoPara">{lifeAtCompany.description}</p>
          <img
            className="lifeAtCompanyImg"
            src={lifeAtCompany.imageUrl}
            alt=""
          />
        </div>
      </div>
    </>
  )
}

export default JobInfo

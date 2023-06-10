import './index.css'
import Header from '../Header'
import LeftSection from '../LeftSection/index'
import RightSection from '../RightSection'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const Jobs = () => {
  console.log('jay')

  return (
    <div className="mainJobsContainer">
      <Header />
      <div className="section">
        <LeftSection
          employmentTypesList={employmentTypesList}
          salaryRangesList={salaryRangesList}
        />
        <RightSection />
      </div>
    </div>
  )
}

export default Jobs

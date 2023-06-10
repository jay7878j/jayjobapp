import './index.css'
import Header from '../Header'

const Home = props => {
  const onFindJobBtnClick = () => {
    const {history} = props
    history.replace('/jobs')
  }

  const getHomeContentContainer = () => (
    <div className="homeContentContainer">
      <h1 className="homeHeading">Find The Job That Fits Your Life</h1>
      <p className="homePara">
        Millions of people are searching for jobs, salary information, company
        reviews. Find the job that fit your abilities and potential.
      </p>
      <button
        className="exploreJobBtn"
        type="button"
        onClick={onFindJobBtnClick}
      >
        Find Jobs
      </button>
    </div>
  )

  return (
    <div className="mainHomeContainer">
      <Header />
      {getHomeContentContainer()}
    </div>
  )
}

export default Home

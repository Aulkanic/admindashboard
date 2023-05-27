import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./home.scss"
import Widget from "../../components/widgets/Widget"
import Featured from '../../components/featured/Featured'
import Table from '../../components/table/Table'
import Chart from "../../components/charts/Chart";

const Home = () => {

  console.log(process.env.REACT_APP_API_URL)

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
      <Navbar />
      <div className="widgets">

        <Widget type='applicant'/>

      </div>

      <div className="charts">
        <Featured />
        <Chart title="Last 6 months (Applicants)" aspect={2 / 1}/>
      </div>

      <div className="listContainer">
          <div className="listTitle"> Latest Transactions </div>
          <Table />
        </div>
      
      </div>
      </div>
  )
}
export default Home
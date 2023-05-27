import { CircularProgressbar } from 'react-circular-progressbar';
import './featured.scss'
import MoreVertIcon from "@mui/icons-material/MoreVert";
import "react-circular-progressbar/dist/styles.css"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const Featured = () => {
  return (
    <div className='featured'>
      <div className="top">
        <h1 className="title"> Total Applicants </h1>
        <MoreVertIcon fontSize="small"/>
      </div>

      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar value={70} text={"70%"} strokeWidth={5}/>
        </div>

       <p className="title"> Total Applicants today </p>
       <p className="amount"> 200 </p>
       <p className="desc"> Previous applicant processing. Last payments may not be included. </p>

        
       <div className="summary">

          <div className="item">
            <div className="itemTitle"> Target </div>
              <div className="itemResult negative">
                <KeyboardArrowDownIcon fontSize="small"/>
                <div className="resultAmount"> 300 </div>
            </div>
          </div>

          <div className="item">
            <div className="itemTitle"> Last Week</div>
              <div className="itemResult positive">
                <KeyboardArrowDownIcon fontSize="small"/>
                <div className="resultAmount"> 150 </div>
            </div>
          </div>

          <div className="item">
            <div className="itemTitle"> Last Month </div>
              <div className="itemResult positive">
                <KeyboardArrowDownIcon fontSize="small"/>
                <div className="resultAmount"> 670 </div>
            </div>
          </div>

        </div>

      </div>

      </div>
  )
}

export default Featured
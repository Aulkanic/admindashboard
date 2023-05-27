import "./widget.scss"
import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ApprovalOutlinedIcon from '@mui/icons-material/ApprovalOutlined';
import ScheduleOutlinedIcon from '@mui/icons-material/ScheduleOutlined';
import TipsAndUpdatesOutlinedIcon from '@mui/icons-material/TipsAndUpdatesOutlined';

import { Link } from "react-router-dom";



const Widgets = ( {type} ) => {

  let data;

  const amount = 100
  const diff = 20

  switch(type){
    case "applicant":
    data = {
      title:"APPLICANTS",
      isMoney: false,
      
      link: "See all users",
      icon: (
      <ApprovalOutlinedIcon className="icon" style={{ backgroundColor: "rgba(255, 0, 0, 0.2)", color: "darkblue"}}/>
      ),
    };
    break;

    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">{data.isMoney && "$"} {amount}</span>
        <span className="link"> 
        <Link to="/applicants">
          {data.link}</Link></span>
        </div>

      <div className="right">
        <div className="percentage positive">
          <ArrowUpwardOutlinedIcon />
          {diff} %
          </div>
        {data.icon}
      </div>

    </div>
    
  )
}

export default Widgets
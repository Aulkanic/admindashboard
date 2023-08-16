import './sidebar.scss';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InfoIcon from '@mui/icons-material/Info';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import SchoolIcon from '@mui/icons-material/School';
import ViewListIcon from '@mui/icons-material/ViewList';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import FeedIcon from '@mui/icons-material/Feed';
import ReportIcon from '@mui/icons-material/Report';
import LogoutIcon from '@mui/icons-material/Logout';
import { Tabs, Tab, Box, Modal,Card,Button } from "@mui/material"; 
import { LogoutAdmin } from '../../api/request';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from "react";
import { admininfo } from "../../App";
import swal from 'sweetalert';
import GroupsIcon from '@mui/icons-material/Groups';
import MoneyIcon from '@mui/icons-material/Money';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import VerifiedIcon from '@mui/icons-material/Verified';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import CampaignIcon from '@mui/icons-material/Campaign';
import GavelIcon from '@mui/icons-material/Gavel';
import LanguageIcon from '@mui/icons-material/Language';
import AssessmentIcon from '@mui/icons-material/Assessment';
import { useState } from 'react';


const Sidebar = () => {
  const { loginUser,user } = useContext(admininfo);
  const navigate = useNavigate();
  const [activeSection,setActiveSection] = useState(0)
  const Logout = async() =>{
    const formData = new FormData();
    formData.append('id',user.id)
      const res = await LogoutAdmin.SET_LOGOUT(formData)
      if(res.data.success === 0){
        swal(res.data.message)
      }else{
        localStorage.setItem('AdminisLogin',false)
        swal({
          text: 'Logging Out....',
          timer: 2000,
          buttons: false,
        })
        await new Promise((resolve) => setTimeout(resolve, 2000));
        navigate('/')
      }
  }
  return (
    <div className='sidebar'>

      <div className='top'> 
                  <img className="mydo" src="https://drive.google.com/uc?id=12yKj9K3Caiaq3hP1JRKRbaLpkIuvapkZ" 
         alt=""/>
        </div>


      <div className='center'> 
          <ul>
          <Link to="/home" onClick={() =>setActiveSection(0)} style={{backgroundColor: activeSection === 0 ? 'lightgreen' : 'none',textDecoration: "none"}}>
            <li >
              <DashboardIcon className='icon' />
              <span> Dashboard </span>
            </li>
            </Link>
            <p className="title"> Web </p>
            <Link to='/faqs' style={{ textDecoration: "none" }}>
            <li>
              <GroupsIcon className='icon'/>
              <span> Employees </span>
            </li>
            </Link>

            <Link to="/scholarships" style={{ textDecoration: "none" }}>
            <li>
              <SchoolIcon className='icon'/>
              <span> Scholarships </span>
            </li>
            </Link>

            <Link to='/about' style={{ textDecoration: "none" }}>
            <li>
              <MoneyIcon className='icon'/>
              <span> Score Card </span>
            </li>
            </Link>

            <Link to="/contact" style={{ textDecoration: "none" }}>
            <li>
              <NoteAddIcon className='icon'/>
              <span> Requirements </span>
            </li>
            </Link>
          


            <p className="title"> Informations </p>

            <Link to="/users" style={{ textDecoration: "none" }}>
            <li>
              <AccountBoxIcon className='icon'/>
              <span> User Accounts</span>
            </li>
            </Link>

            <Link to="/Evaluation" style={{ textDecoration: "none" }}>
            <li>
              <VerifiedIcon className='icon'/>
              <span> Evaluation </span>
            </li>
            </Link>
            <Link to="/applicants" style={{ textDecoration: "none" }}>
            <li>
              <PeopleAltIcon className='icon'/>
              <span> Applicants </span>
            </li>
            </Link>

            <Link to="/appointments" style={{ textDecoration: "none" }}>
            <li>
              <CalendarMonthIcon className='icon'/>
              <span> Appointments </span>
            </li>
            </Link>

            <Link to="/scholars" style={{ textDecoration: "none" }}>
            <li>
              <HistoryEduIcon className='icon'/>
              <span> Scholars </span>
            </li>
            </Link>

            <p className="title"> Maintenance </p>
            <Link to='/Website-Maintenance' style={{ textDecoration: 'none'}}>
            <li>
              <LanguageIcon className='icon'/>
              <span> BMCC Website </span>
            </li>
            </Link>
            <Link to='/Announcement' style={{ textDecoration: 'none'}}>
            <li>
              <CampaignIcon className='icon'/>
              <span> Announcement </span>
            </li>
            </Link>
            <Link to='/Rules' style={{ textDecoration: 'none'}}>
            <li>
              <GavelIcon className='icon'/>
              <span> Rules </span>
            </li>
            </Link>

            <Link to='/news' style={{ textDecoration: 'none'}}>
            <li>
              <FeedIcon className='icon'/>
              <span> News </span>
            </li> 
            </Link>
            
            <Link to='/Report' style={{ textDecoration: 'none'}}>
            <li>
              <AssessmentIcon className='icon'/>
              <span> Reports </span>
            </li>
            </Link>

<           Link style={{ textDecoration: "none"}}>
            <Button onClick={Logout}>
            <li>
              <LogoutIcon className='icon'/>
              <span> Logout </span>
            </li>
            </Button>
            </Link>

          </ul>
        </div>

      
    </div>
  )
}

export default Sidebar
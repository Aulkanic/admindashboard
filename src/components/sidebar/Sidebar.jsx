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
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setAuthenticated,setAdmin } from '../../Redux/loginSlice';
import { useSelector } from "react-redux";

const Sidebar = () => {
  const dispatch = useDispatch();
  const { admin  } = useSelector((state) => state.login)
  const navigate = useNavigate();
  const [activeSection,setActiveSection] = useState(0);
  const sections = admin[1].split(', '); 
  
  const Logout = async() =>{
    const formData = new FormData();
    formData.append('id',admin[0].id)
       await LogoutAdmin.SET_LOGOUT(formData)
       dispatch(setAuthenticated(false))
       dispatch(setAdmin([]))
       navigate('/')
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
            <li className='liactive'>
              <DashboardIcon className='icon' />
              <span> Dashboard </span>
            </li>
          </Link>
            <p className="title"> Web </p>
          {sections.includes('Account Creation') || sections.includes('Account Management') || sections.includes('Administrator') ? (
          <Link to='/faqs' style={{ textDecoration: "none" }}>
            <li>
              <GroupsIcon className='icon'/>
              <span> Employees </span>
            </li>
          </Link>) : (null)}
          {sections.includes('Scholarship Programs') || sections.includes('Administrator') ? (
          <Link to="/scholarships" style={{ textDecoration: "none" }}>
            <li>
              <SchoolIcon className='icon'/>
              <span> Scholarships </span>
            </li>
          </Link>) : (null)}
          {sections.includes('Score Card') || sections.includes('Administrator') ? (
          <Link to='/about' style={{ textDecoration: "none" }}>
            <li>
              <MoneyIcon className='icon'/>
              <span> Score Card </span>
            </li>
          </Link>) : (null)}
          {sections.includes('Requirements Management') || sections.includes('Administrator') ? (
          <Link to="/contact" style={{ textDecoration: "none" }}>
            <li>
              <NoteAddIcon className='icon'/>
              <span> Requirements </span>
            </li>
          </Link>) : (null)}

            <p className="title"> Informations </p>

            {sections.includes('Reports') || sections.includes('Administrator') ? (
            <Link to="/users" style={{ textDecoration: "none" }}>
            <li>
              <AccountBoxIcon className='icon'/>
              <span> User Accounts</span>
            </li>
            </Link>) : (null)}

            {sections.includes('Evaluation') || sections.includes('Passing Score and Slots') || sections.includes('Administrator') ? (
            <Link to="/Evaluation" style={{ textDecoration: "none" }}>
            <li>
              <VerifiedIcon className='icon'/>
              <span> Evaluation </span>
            </li>
            </Link>) : (null)}
            {sections.includes('Applicant Management') || sections.includes('Requirements Verification') || sections.includes('Administrator') ? (
            <Link to="/applicants" style={{ textDecoration: "none" }}>
            <li>
              <PeopleAltIcon className='icon'/>
              <span> Applicants </span>
            </li>
            </Link>) : (null)}

            {sections.includes('Appointment Management') || sections.includes('Appointment Scheduling') || sections.includes('Administrator') ? (
            <Link to="/appointments" style={{ textDecoration: "none" }}>
            <li>
              <CalendarMonthIcon className='icon'/>
              <span> Appointments </span>
            </li>
            </Link>) : (null)}

            {sections.includes('Scholarship Monitoring') || sections.includes('Administrator') ? (<Link to="/scholars" style={{ textDecoration: "none" }}>
            <li>
              <HistoryEduIcon className='icon'/>
              <span> Scholars </span>
            </li>
            </Link>) : (null)}

            <p className="title"> Maintenance </p>
            {sections.includes('Website Maintenance') || sections.includes('Administrator') ? (
            <Link to='/Website-Maintenance' style={{ textDecoration: 'none'}}>
            <li>
              <LanguageIcon className='icon'/>
              <span> BMCC Website </span>
            </li>
            </Link>) : (null)}
            {sections.includes('News and Announcements') || sections.includes('Administrator') ? (
            <Link to='/Announcement' style={{ textDecoration: 'none'}}>
            <li>
              <CampaignIcon className='icon'/>
              <span> Announcement </span>
            </li>
            </Link>) : (null)}
            {sections.includes('Rule Implementation') || sections.includes('Administrator') ? (
            <Link to='/Rules' style={{ textDecoration: 'none'}}>
            <li>
              <GavelIcon className='icon'/>
              <span> Rules </span>
            </li>
            </Link>) : (null)}

            {sections.includes('News and Announcements') || sections.includes('Administrator') ? (
            <Link to='/news' style={{ textDecoration: 'none'}}>
            <li>
              <FeedIcon className='icon'/>
              <span> News </span>
            </li> 
            </Link>) : (null)}
            
            {sections.includes('Reporting') || sections.includes('Administrator') ? (
            <Link to='/Report' style={{ textDecoration: 'none'}}>
            <li>
              <AssessmentIcon className='icon'/>
              <span> Reports </span>
            </li>
            </Link>) : (null)}
            {sections.includes('Administrator') ? (
            <Link to='/Backups' style={{ textDecoration: 'none'}}>
            <li>
              <SettingsBackupRestoreIcon className='icon'/>
              <span> Backups </span>
            </li>
            </Link>) : (null)}

            <Link onClick={Logout} style={{ textDecoration: "none"}}>
            <li>
            <LogoutIcon className='icon'/>
            <span> Logout </span>
            <Button 
            sx={{ textTransform: "none"}}>
            </Button>
            </li>   
          </Link>

          </ul>
      </div>
    </div>
  )
}

export default Sidebar
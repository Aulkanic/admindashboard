import DashboardIcon from '@mui/icons-material/Dashboard';
import SchoolIcon from '@mui/icons-material/School';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import FeedIcon from '@mui/icons-material/Feed';
import { LazyImage } from '../Images/image';
import { RouteUrl } from '../../Routes/routes';
import MYDO from '../../Images/mydo-removebg-preview.png'
import GroupsIcon from '@mui/icons-material/Groups';
import MoneyIcon from '@mui/icons-material/Money';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import CampaignIcon from '@mui/icons-material/Campaign';
import GavelIcon from '@mui/icons-material/Gavel';
import LanguageIcon from '@mui/icons-material/Language';
import AssessmentIcon from '@mui/icons-material/Assessment';
import { GiCash } from "react-icons/gi";
import { useNavigate } from 'react-router-dom';
import { MdKeyboardArrowUp } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";
import clsx from 'clsx';
import { useState } from 'react';

const Sidebar = () => {
  const navigate = useNavigate();
  const [show,setShow] = useState({
    dashboard:false,
    manage:false,
    maintenance:false
  })
  const links = [
    { id:0 , name: 'Home', url: RouteUrl.DASHBOARD, icon: <DashboardIcon />,section:'dashboard'},
    { id:1 , name: 'Employees', url: RouteUrl.EMPLOYEES, icon: <GroupsIcon />,section:'dashboard'},
    { id:2 , name: 'Sholarships', url: RouteUrl.SCHOLARSHIP, icon: <SchoolIcon />,section:'dashboard'},
    { id:3 , name: 'Score Card', url: RouteUrl.SCORE_CARD, icon: <MoneyIcon />,section:'dashboard'},
    { id:4 , name: 'Requirements', url: RouteUrl.REQUIREMENTS, icon: <NoteAddIcon />,section:'dashboard'},
    { id:5 , name: 'User Accounts', url: RouteUrl.USER_ACCOUNT, icon: <AccountBoxIcon />,section:'dashboard'},
    { id:6 , name: 'Evaluation', url: RouteUrl.EVALUATION, icon: <AccountBoxIcon />,section:'manage'},
    { id:7 , name: 'Application', url: RouteUrl.APPLICATION, icon: <PeopleAltIcon />,section:'manage'},
    { id:8 , name: 'Appointments', url: RouteUrl.APPOINTMENT, icon: <CalendarMonthIcon />,section:'manage'},
    { id:9 , name: 'Scholars', url: RouteUrl.SCHOLARS, icon: <HistoryEduIcon />,section:'manage'},
    { id:10 , name: 'Payroll', url: RouteUrl.PAYROLL, icon: <GiCash />,section:'manage'},
    { id:11 , name: 'MYDO Website', url: RouteUrl.MYDO_WEB, icon: <LanguageIcon />,section:'maintenance'},
    { id:12 , name: 'Announcement', url: RouteUrl.ANNOUNCEMENT, icon: <CampaignIcon />,section:'maintenance'},
    { id:13 , name: 'Rules', url: RouteUrl.RULES, icon: <GavelIcon />,section:'maintenance'},
    { id:14 , name: 'News', url: RouteUrl.NEWS, icon: <FeedIcon />,section:'maintenance'},
    { id:15 , name: 'Reports', url: RouteUrl.REPORTS, icon: <AssessmentIcon />,section:'maintenance'},
  ]

  const handleClick  = (data) =>{
     navigate(`${data.url}`)
  }
  const handleSectionChange = (section) => {
    setShow((prevShow) => ({
      ...prevShow,
      [section]: !prevShow[section]
    }));
  };

  return (
    <div className='bg-blueish min-h-screen h-max max-h-full relative hidden md:flex flex-col justify-top items-center w-[300px] pt-2'>
      <div className='w-full flex items-center pr-8 mb-4 border-b-2 border-white'>
        <div className='w-16 h-16 m-4 rounded-lg bg-white'> 
          <LazyImage
            images={MYDO}
          />
        </div>
        <div>
          <p className='font-semibold truncate text-white'>Marilao Youth</p>
          <p className='font-semibold text-white'>Development</p>
          <p className='font-semibold text-white'>Office</p>
        </div>
      </div>
      <div className='w-11/12 flex flex-col gap-4 pb-8 px-4'> 
        <div>
          <div className='cursor-pointer flex items-center justify-between'
          onClick={() =>handleSectionChange('dashboard')}>
            <p className='font-bold text-lg text-white'>Dashboard</p>
            {show.dashboard ? <MdKeyboardArrowUp className='text-white' size={25} /> : <MdKeyboardArrowDown className='text-white' size={25} />}
          </div>
          <hr />
        <ul className={clsx(show.dashboard ? 'flex flex-col gap-2 flex-wrap z-50' : 'hidden')}>
          {links.filter(data => data.section === 'dashboard').map((data,index) =>{
            return(
              <li key={index} onClick={() =>handleClick(data)} 
              className='w-full cursor-pointer truncate flex gap-2 hover:bg-white text-white hover:text-black hover:font-bold p-2 rounded-md transition ease-in-out delay-50'>
                {data.icon} {data.name}
              </li>
            )
          })}
        </ul>   
        </div>
        <div>
        <div className='cursor-pointer flex items-center justify-between'
        onClick={() =>handleSectionChange('manage')}>
          <p className='font-bold text-lg text-white'>Management</p>
          {show.manage ? <MdKeyboardArrowUp className='text-white' size={25} /> : <MdKeyboardArrowDown className='text-white' size={25} />}
        </div>
        <hr />
        <ul className={clsx(show.manage ? 'flex flex-col gap-2 flex-wrap z-50' : 'hidden')}>
          {links.filter(data => data.section === 'manage').map((data,index) =>{
            return(
              <li key={index} onClick={() =>handleClick(data)} 
              className='w-full cursor-pointer truncate flex gap-2 hover:bg-white text-white hover:text-black hover:font-bold p-2 rounded-md transition ease-in-out delay-50'>
                {data.icon} {data.name}
              </li>
            )
          })}
        </ul>   
        </div>
        <div>
        <div className='cursor-pointer flex items-center justify-between'
          onClick={() =>handleSectionChange('maintenance')}>
          <p className='font-bold text-lg text-white'>Maintenance</p>
          {show.maintenance ? <MdKeyboardArrowUp className='text-white' size={25} /> : <MdKeyboardArrowDown className='text-white' size={25} />}
        </div>
        <hr />
        <ul className={clsx(show.maintenance ? 'flex flex-col gap-2 flex-wrap z-50' : 'hidden')}>
          {links.filter(data => data.section === 'maintenance').map((data,index) =>{
            return(
              <li key={index} onClick={() =>handleClick(data)} className='w-full cursor-pointer truncate flex gap-2 hover:bg-white text-white hover:text-black hover:font-bold p-2 rounded-md transition ease-in-out delay-50'>
                {data.icon} {data.name}
              </li>
            )
          })}
        </ul>          
        </div>
      </div>
    </div>
  )
}

export default Sidebar
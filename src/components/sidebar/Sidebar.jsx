import './sidebar.scss';
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

const Sidebar = () => {
  const navigate = useNavigate()
  const links = [
    { id:0 , name: 'Home', url: RouteUrl.DASHBOARD, icon: <DashboardIcon />},
    { id:1 , name: 'Employees', url: RouteUrl.EMPLOYEES, icon: <GroupsIcon />},
    { id:2 , name: 'Sholarships', url: RouteUrl.SCHOLARSHIP, icon: <SchoolIcon />},
    { id:3 , name: 'Score Card', url: RouteUrl.SCORE_CARD, icon: <MoneyIcon />},
    { id:4 , name: 'Requirements', url: RouteUrl.REQUIREMENTS, icon: <NoteAddIcon />},
    { id:5 , name: 'User Accounts', url: RouteUrl.USER_ACCOUNT, icon: <AccountBoxIcon />},
    { id:6 , name: 'Evaluation', url: RouteUrl.EVALUATION, icon: <AccountBoxIcon />},
    { id:7 , name: 'Application', url: RouteUrl.APPLICATION, icon: <PeopleAltIcon />},
    { id:8 , name: 'Appointments', url: RouteUrl.APPOINTMENT, icon: <CalendarMonthIcon />},
    { id:9 , name: 'Scholars', url: RouteUrl.SCHOLARS, icon: <HistoryEduIcon />},
    { id:10 , name: 'Payroll', url: RouteUrl.PAYROLL, icon: <GiCash />},
    { id:11 , name: 'MYDO Website', url: RouteUrl.MYDO_WEB, icon: <LanguageIcon />},
    { id:12 , name: 'Announcement', url: RouteUrl.ANNOUNCEMENT, icon: <CampaignIcon />},
    { id:13 , name: 'Rules', url: RouteUrl.RULES, icon: <GavelIcon />},
    { id:14 , name: 'News', url: RouteUrl.NEWS, icon: <FeedIcon />},
    { id:15 , name: 'Reports', url: RouteUrl.REPORTS, icon: <AssessmentIcon />},
  ]

  const handleClick  = (data) =>{
     navigate(`${data.url}`)
  }

  return (
    <div className='bg-blueish h-max relative hidden md:flex flex-col justify-top items-center w-[300px] px-4'>
      <div className='w-28 h-28'> 
        <LazyImage
          images={MYDO}
        />
      </div>
      <div className='w-11/12'> 
          <ul className='flex flex-col gap-2 flex-wrap z-50'>
            {links.map((data,index) =>{
              return(
                <li key={index} onClick={() =>handleClick(data)} className='w-full cursor-pointer truncate flex gap-2 hover:bg-white text-white hover:text-black hover:font-bold p-2 rounded-md transition ease-in-out delay-50'>
                  {data.icon} {data.name}
                </li>
              )
            })}
          </ul>
      </div>
    </div>
  )
}

export default Sidebar
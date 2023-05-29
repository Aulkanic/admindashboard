import './sidebar.scss';
import DashboardIcon from '@mui/icons-material/Dashboard';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import DateRangeIcon from '@mui/icons-material/DateRange';
import ApprovalIcon from '@mui/icons-material/Approval';
import SchoolIcon from '@mui/icons-material/School';
import SavingsIcon from '@mui/icons-material/Savings';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';

import { Link } from 'react-router-dom';

const Sidebar = () => {

  return (
    <div className='sidebar'>

      <div className='top'> 
          <span className='logo'> Mar-Isko </span>
        </div>
        <hr/>

      <div className='center'> 
          <ul>

          <Link to="/" style={{ textDecoration: "none" }}>
            <li>
              <DashboardIcon className='icon' />
              <span> Dashboard </span>
            </li>
            </Link>

            <p className="title"> Web </p>

            <Link to="/scholarships" style={{ textDecoration: "none" }}>
            <li>
              <RecentActorsIcon className='icon'/>
              <span> Scholarships </span>
            </li>
            </Link>

            <Link to='/about' style={{ textDecoration: "none" }}>
            <li>
              <DateRangeIcon className='icon'/>
              <span> About </span>
            </li>
            </Link>

            <Link to="/contact" style={{ textDecoration: "none" }}>
            <li>
              <ApprovalIcon className='icon'/>
              <span> Contact </span>
            </li>
            </Link>
          
            <Link to='/faqs' style={{ textDecoration: "none" }}>
            <li>
              <SchoolIcon className='icon'/>
              <span> FAQ's </span>
            </li>
            </Link>

            <p className="title"> Informations </p>

            <Link to="/applicants" style={{ textDecoration: "none" }}>
            <li>
              <SavingsIcon className='icon'/>
              <span> Applicants </span>
            </li>
            </Link>

            <Link to="/users" style={{ textDecoration: "none" }}>
            <li>
              <EmojiEventsIcon className='icon'/>
              <span> User Accounts</span>
            </li>
            </Link>

            <Link to="/appointments" style={{ textDecoration: "none" }}>
            <li>
              <LeaderboardIcon className='icon'/>
              <span> Appointments </span>
            </li>
            </Link>

            <Link to="/scholars" style={{ textDecoration: "none" }}>
            <li>
              <AccountCircleIcon className='icon'/>
              <span> Scholars </span>
            </li>
            </Link>

            <p className="title"> Maintenance </p>

            <li>
              <AddCircleIcon className='icon'/>
              <span> Announcement </span>
            </li>

            
            <li>
            <Link to='/news' style={{ textDecoration: 'none'}}>
              <AddCircleIcon className='icon'/>
              <span> News </span>
              </Link>
            </li>

            
            <li>
           
              <AddCircleIcon className='icon'/>
              <span> Reports </span>
          
            </li>

            <li>
              <Link to='/' style={{ textDecoration: "none"}}>
              <LogoutIcon className='icon'/>
              <span> Logout </span>
              </Link>
            </li>

          </ul>
        </div>

      
    </div>
  )
}

export default Sidebar
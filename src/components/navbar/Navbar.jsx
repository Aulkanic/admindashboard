import './navbar.scss';

import SearchIcon from '@mui/icons-material/Search';
import LanguageIcon from '@mui/icons-material/Language';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ViewListIcon from '@mui/icons-material/ViewList';


const Navbar = () => {
  return (
    <div className='navbar'>
      <div className='wrapper'>
        <div className='search'>
          <input type='text' placeholder='Search' />
          <SearchIcon/>
         </div>

        <div className='items'>

          <div className='item'>
            <LanguageIcon className='icon'/>
            English
          </div>
          <div className='item'>
            <DarkModeIcon className='icon'/>
          </div>
          <div className='item'>
            <OpenInFullIcon className='icon'/>
          </div>
          <div className='item'>
            <NotificationsNoneIcon className='icon'/>
            <div className="counter">1</div>
          </div>
          <div className='item'>
            <ChatBubbleOutlineIcon className='icon'/>
            <div className="counter">2</div>
          </div>
          <div className='item'>
            <ViewListIcon />
          </div>

          <div className="item">
            <img src='https://i.pinimg.com/originals/e2/bc/e1/e2bce16148e5f83a67e8b405123001fa.jpg' alt='' 
            className='avatar'>
            </img>
          </div>


        </div>

        </div>
      </div>
  );
};

export default Navbar
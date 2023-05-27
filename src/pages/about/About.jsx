import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import './about.scss';

export const About = () => {
  return (
    <div className="about">
        <Sidebar/>
        <div className="aboutContainer">
        <Navbar/>
        <div className="top">
          <h1> About </h1>
        </div>
        </div>
    </div>
  )
}

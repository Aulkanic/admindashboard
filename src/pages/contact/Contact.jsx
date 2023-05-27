import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import './contact.scss';

const Contact = () => {
  return (
    <div className="contact">
        <Sidebar/>
        <div className="contactContainer">
            <Navbar />
            <div className="top">
              <h1>Contacts</h1>

              <div className="cards">

              <div className="contact">
                <h2>Address</h2>
              </div>

              <div className="contact">
                <h2>Email</h2>
              </div>
               
              <div className="contact">
              <h2>Telephone</h2>
              </div>
              
              </div>

            </div>
        </div>
    </div>
  )
}

export default Contact
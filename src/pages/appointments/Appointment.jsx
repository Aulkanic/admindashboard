import "./appointment.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";    


const Appointment = () => {
  return (
    <div className="appointment">
        <Sidebar/>
        <div className="appointmentContainer">
            <Navbar />
            <div className="top">
              <h1> Appointments </h1>
            </div>
        </div>
    </div>
  )
}

export default Appointment
import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import "./scholarships.scss"
import EditIcon from '@mui/icons-material/Edit';


const Scholarships = ({inputs, title}) => {

  
  return (
    <div className="scholarships">
        <Sidebar/>
    <div className="scholarshipsContainer">
        <Navbar/>
        <div className="top">
          <h1>Scholarships</h1>

          <button className="addnew"> 
          Add New Scholarship 
          </button>
          
        <div className="cards">

        <div className="left">
            <EditIcon className="icon"/>
            <h2>Academic</h2>
            <p> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quidem iusto iste illo dicta eos a!
                Exercitationem eligendi beatae expedita est, 
                sit incidunt aperiam similique provident laborum, impedit minima? Possimus, cumque!</p>
              <button className="applybtn"> Apply Now!</button>
        </div>

        <div className="right">
            <EditIcon className="icon"/>
            <h2>Economic</h2>
            <p> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quidem iusto iste illo dicta eos a!
                Exercitationem eligendi beatae expedita est, 
                sit incidunt aperiam similique provident laborum, impedit minima? Possimus, cumque!</p>
              <button className="applybtn"> Apply Now! </button>
        </div>
        </div>

        <div className="cards">

        <div className="left">
            <EditIcon className="icon"/>
        <h2>Academic</h2>
        <p> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quidem iusto iste illo dicta eos a!
                Exercitationem eligendi beatae expedita est, 
                sit incidunt aperiam similique provident laborum, impedit minima? Possimus, cumque!</p>
              <button className="applybtn"> Apply Now! </button>
        </div>

        <div className="right">
            <EditIcon className="icon"/>
        <h2>Economic</h2>
        <p> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quidem iusto iste illo dicta eos a!
                Exercitationem eligendi beatae expedita est, 
                sit incidunt aperiam similique provident laborum, impedit minima? Possimus, cumque!</p>
              <button className="applybtn"> Apply Now! </button>
        </div>
        </div>



          </div>
            </div>
          </div>
           

  )
}

export default Scholarships
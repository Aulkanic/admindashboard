import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import './single.scss';

const Single = () => {
  
  return (
    <div className="single">
      <Sidebar/>
    <div className="singleContainer">
      <Navbar/>
      <div className="top">
          <div className="left">
            <div className="editButton"> Edit </div>
            <h1 className="title">Information</h1>

              <div className="item">
                <img src="https://scontent.fcrk1-4.fna.fbcdn.net/v/t39.30808-1/320078628_1906759176338094_6278034478351068357_n.jpg?stp=dst-jpg_p200x200&_nc_cat=102&ccb=1-7&_nc_sid=c6021c&_nc_eui2=AeGKt9dCeDN118HQ2R7lz8_Pt2YS-hgqcNS3ZhL6GCpw1LM2aiEzzSdSpafO9QJl6dEWT9Adc6-PRhcPSOoZTfjT&_nc_ohc=NvVnJIY8o3AAX90yc0i&_nc_ht=scontent.fcrk1-4.fna&oh=00_AfC-8I1IdrQtNib5b8nl0cx_jNoiLI1qXQ1wTQQ7VBF86w&oe=64564238" 
                alt="" 
                className="itemImg" />
                
                <div className="details">
                  <h1 className="itemTitle"> Jane Doe </h1>

                  <div className="detailItem">
                    <span className="itemKey">Email: </span>
                    <span className="itemValue">janedoe@gmail.com</span>
                  </div>

                  <div className="detailItem">
                    <span className="itemKey">Phone: </span>
                    <span className="itemValue">+63 123 123 123</span>
                  </div>

                  <div className="detailItem">
                    <span className="itemKey">Address: </span>
                    <span className="itemValue">Brgy. Di Makita Kahit Saan Bulacan</span>
                  </div>

                  <div className="detailItem">
                    <span className="itemKey">Country: </span>
                    <span className="itemValue">Earth</span>
                  </div>
                </div>
              </div>
            </div>
    </div>
    </div>
    </div>
  )
}

export default Single
import Home from './pages/home/Home';
import Login from './pages/login/Login';
// import List from './pages/list/List';
// import Single from './pages/single/Single';
// import New from './pages/new/New';
import { About } from './pages/about/About';
import Contact from './pages/contact/Contact';
import Scholarships from './pages/scholarships/Scholarships';
import Faqs from './pages/faqs/Faqs';

import Applicant from './pages/applicants/Applicant';
import Users from './pages/users/Users';
import Appointment from './pages/appointments/Appointment';
import Scholars from './pages/scholars/Scholars';

import { BrowserRouter, Routes, Route,} from "react-router-dom";
import Single from './pages/single/Single';


function App() {
  return (
    <div className="App">
        <BrowserRouter>
      <Routes>
        <Route path="/">

          
          <Route index element={<Home/>} />

          <Route path='login' element={<Login/>} />
          <Route path='scholarships' element={<Scholarships/>}/>
          <Route path='about' element={<About />} />
          <Route path='contact' element={<Contact />} />
          <Route path='faqs' element={<Faqs />} />


          <Route path='applicants' element={<Applicant/>} />
          <Route path='single' element={<Single/>} />
          <Route path='users' element={<Users/>} />
          <Route path='appointments' element={<Appointment/>} />
          <Route path='scholars' element={<Scholars/>} />
          

          {/* <Route path='users'>
            <Route index element={<List/>} />
            <Route path=':userId' element = {<Single/>} />
            <Route path='new' element = {<New/>} />
          </Route> */}


        </Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;

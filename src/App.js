import Home from './pages/home/Home';
import Login from './pages/login/Login';
import { About } from './pages/req_score/About';
import Contact from './pages/contact/Contact';
import Scholarships from './pages/scholarships/Scholarships';
import Faqs from './pages/faqs/Faqs';
import Applicant from './pages/applicants/Applicant';
import Users from './pages/users/Users';
import Appointment from './pages/appointments/Appointment';
import Scholars from './pages/scholars/Scholars';
import Evaluation from './pages/Evaluation/evaluation';
import Rule from './pages/Rules/rule';
import Website from './pages/Website/website';
import News from './pages/new/New';
import Announcement from './pages/Announcement/announcement';
import Report from './pages/Reports/report';
import { BrowserRouter, Routes, Route,} from "react-router-dom";
import Single from './pages/single/Single';
import { createContext } from 'react';
import { useState } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './Redux/store';
import AuthGuard from './Redux/AuthGuard';


export const admininfo = createContext();
function App() {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const [user, setUser] = useState(storedUser || null);
  const loginUser = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };
  console.log(user)
  return (
    <div className="App">
        <BrowserRouter>
        <admininfo.Provider value={{ user, loginUser }}>
        <Provider store={store}>
        <PersistGate loadin={null} persistor={persistor}>
      <Routes>
        <Route path="/">
            <Route index element={<Login/>} />
            <Route element={<AuthGuard />}>
                <Route path='home' element={<Home/>} />
                <Route path='scholarships' element={<Scholarships/>}/>
                <Route path='about' element={<About />} />
                <Route path='contact' element={<Contact />} />
                <Route path='faqs' element={<Faqs />} />
                <Route path='news' element={<News/>} />
                <Route path='applicants' element={<Applicant/>} />
                <Route path='single' element={<Single/>} />
                <Route path='users' element={<Users/>} />
                <Route path='appointments' element={<Appointment/>} />
                <Route path='scholars' element={<Scholars/>} />
                <Route path='Evaluation' element={<Evaluation/>} />
                <Route path='Rules' element={<Rule/>} />
                <Route path='Announcement' element={<Announcement/>} />
                <Route path='Website-Maintenance' element={<Website/>} />
                <Route path='Report' element={<Report/>} />
          </Route>
        </Route>
      </Routes>
      </PersistGate>
      </Provider>
      </admininfo.Provider>
    </BrowserRouter>
    </div>
  );
}

export default App;

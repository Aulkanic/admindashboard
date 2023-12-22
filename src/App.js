import { createBrowserRouter,RouterProvider} from "react-router-dom";
import { createContext } from 'react';
import { ToastContainer } from 'react-toastify';
import { useState } from 'react';
import { RouteUrl } from "./Routes/routes";
import { Public,Private } from "./layout";
import { Login,Home,ScholarProg,Scholars,Scorecard,Evaluation,Application,Staff,Requirements,UserAccs,Appointment,Payroll,Website,Announcement,Rules,News,Reports } from "./Page";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './Redux/store';
import './App.css';


export const admininfo = createContext();
function App() {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const [user, setUser] = useState(storedUser || null);
  const loginUser = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };
  const router = createBrowserRouter([
    {
      path:RouteUrl.HOME,
      element: <Public />,
      children:[
         {
          path: RouteUrl.LOGIN,
          element: <Login />
         }
      ]
    },
    {
      path: RouteUrl.HOME,
      element: <Private />,
      children: [
        {path: RouteUrl.DASHBOARD, element: <Home />},
        {path: RouteUrl.EMPLOYEES, element: <Staff />},
        {path: RouteUrl.SCHOLARSHIP, element: <ScholarProg />},
        {path: RouteUrl.SCORE_CARD, element: <Scorecard />},
        {path: RouteUrl.REQUIREMENTS, element: <Requirements />},
        {path: RouteUrl.USER_ACCOUNT, element: <UserAccs />},
        {path: RouteUrl.EVALUATION, element: <Evaluation />},
        {path: RouteUrl.APPLICATION, element: <Application />},
        {path: RouteUrl.APPOINTMENT, element: <Appointment />},
        {path: RouteUrl.SCHOLARS, element: <Scholars />},
        {path: RouteUrl.PAYROLL, element: <Payroll />},
        {path: RouteUrl.MYDO_WEB, element: <Website />},
        {path: RouteUrl.RULES, element: <Rules />},
        {path: RouteUrl.ANNOUNCEMENT, element: <Announcement />},
        {path: RouteUrl.NEWS, element: <News />},
        {path: RouteUrl.REPORTS, element: <Reports />},
      ]
    }
  ])
  return (
    <div className="App" style={{backgroundColor:'#f1f3fa'}}>
          <admininfo.Provider value={{ user, loginUser }}>
            <Provider store={store}>
              <PersistGate loading={null} persistor={persistor}>
                <ToastContainer />
                <RouterProvider router={router} fallbackElement={<h6>Loading</h6>} />
              </PersistGate>
            </Provider>
          </admininfo.Provider>
    </div>
  );
}

export default App;



import { Route, Routes } from 'react-router-dom';
import Login from './Compononets/Login/Login';
import './css/style.css'
import Userdashboard from './Compononets/Userdashboard/Userdashboard';
import Sidebar from './Compononets/Userheader/Sidebar';
import Viewnotifications from './Compononets/Viewnotifications/Viewnotifications';
import Notification from './Compononets/Notification/Notification';
import Signup from './Compononets/Signup/Signup';
import Normalsignup from './Compononets/Normalsignup/Normalsignup';
import Vipsignup from './Compononets/Vipsignup/Vipsignup';
import Forget from './Compononets/Forget/Forget';
import Professions from './Compononets/Professions/Professions';
import Help from './Compononets/Help/Help';
import Viewhelp from './Compononets/Viewhelp/Viewhelp';
import Viewprofile from './Compononets/Viewprofile/Viewprofile';
import EditPost from './Compononets/EditPost/EditPost';

function App() {
  return (
  <>
  <section className="maindiv">
  <Routes>
    <Route path='/' element={<Login/>} />      
    <Route path='/userdashboard' element={<><Sidebar/><Userdashboard/></> } />
    <Route path='/viewnotifications' element={<><Sidebar/><Viewnotifications/></> } />
    <Route path='/Notification' element={<><Sidebar/><Notification/></> } />
    <Route path='/Normalsignup' element={<><Normalsignup/></> } />
    <Route path='/Signup' element={<><Signup/></> } />
    <Route path='/Vipsignup' element={<><Vipsignup/></> } />
    <Route path='/Forget' element={<><Forget/></> } />
    <Route path='/professions/:id' element={<><Sidebar/><Professions/></> } />
    <Route path='/Help' element={<><Sidebar/><Help/></> } />
    <Route path='/Viewhelp/:id' element={<><Sidebar/><Viewhelp/></> } />
    <Route path='/viewprofile/:name' element={<Viewprofile />} />
    <Route path='/viewprofile/:id' element={<Viewprofile />} />
    <Route path='/editPost' element={<><Sidebar/><EditPost /></> } />

  </Routes>
  </section>
  
  </>
  );
}

export default App;

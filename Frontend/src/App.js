
import './App.css';
import { Routes ,Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './components/Home/Home';
import Login from './components/Login/Login';

import NotFoundPage from './components/NotFoundPage/NotFoundPage';
import Register from './components/Register/Register';
import Auth from './components/Auth/Auth';
function App() {
  const Role = {
    ADMIN:"ADMIN",
    STUDENT:"STUDENT",
    INSTRUCTOR:"INSTRUCTOR"
  }
  return (
    <AuthProvider>
      <Routes>
        {/* public Routes */}
        <Route path ='/login' element ={<Login/>}/>
        <Route path ='/register' element = {<Register/>}/>
        <Route path ='/home' element = {<Home/>}/>
        {/* admin Routes */}
        <Route element={<Auth allowedRoles={[Role.ADMIN]}/>}>
            <Route path ='/home' element = {<Home/>}/>
        </Route>
        {/* instructor Routes */}
    
        <Route element={<Auth allowedRoles={[Role.INSTRUCTOR]}/>}>
          <Route path = '/instructor' element = {<Home/>}/>
        </Route>
        {/* student Routes */}
        <Route element={<Auth allowedRoles={[Role.STUDENT]}/>}>
          <Route path='/student' element={<Home/>}/>
        </Route>
        {/* not found routes */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;

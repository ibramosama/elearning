
import './App.css';
import { Routes ,Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import InstructorProfile from './components/InstructorProfile/InstructorProfile'
import NotFoundPage from './components/NotFoundPage/NotFoundPage';
import Register from './components/Register/Register';
import Auth from './components/Auth/Auth';
import Google from './components/Auth/Goggle';
import Facebook from './components/Auth/Facebook';
import Test from './components/Register/Test';
import CourseDetails from './components/CourseDetails/CourseDetails';
import CourseDashboard from './components/CourseDashboard/CourseDashboard';
import CourseByCategory from './components/Home/CourseByCategory/CourseByCategory';
function App() {
  const Role = {
    ADMIN:"admin",
    STUDENT:"student",
    INSTRUCTOR:"instructor"
  }
  return (
    <AuthProvider>
      <Routes>
        {/* public Routes */}
        <Route path='/category/:id' element={<CourseByCategory/>}></Route>
        <Route path='/course_display' element={<CourseDashboard/>}></Route>
        <Route path='/course_details/:id' element={<CourseDetails/>}></Route>
        <Route path ='/login' element ={<Login/>}/>
        <Route path ='/register' element = {<Register/>}/>
        <Route path='profile' element={<InstructorProfile></InstructorProfile>}></Route>
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
        <Route path = '/test' element = {<Test/>}/>
        <Route path="/Google" element={<Google/>}/>
        <Route path="/Facebook" element={<Facebook/>}/>
        <Route path="/notFound" element = {<NotFoundPage></NotFoundPage>}/>
        <Route path="*" element={<NotFoundPage />} />

      </Routes>
    </AuthProvider>
  );
}

export default App;

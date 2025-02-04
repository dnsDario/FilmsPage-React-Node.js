
import { useContext} from 'react'
import { SessionContext } from './context/SessionProvider'
import {Link, Navigate, Route, Routes, useNavigate} from "react-router-dom"

import './App.css'
import Home from "./pages/home/Home"
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'
import Films from './pages/films/Films'
import Series from './pages/series/Series'
import AdminFilms from './pages/admin-films/Admin-films'
import AdminUsers from './pages/admin-users/Admin-users'



import { GiFilmStrip } from "react-icons/gi";

import { GrUserAdmin } from "react-icons/gr";
import { AiOutlineLogout } from "react-icons/ai";
import { FaHome } from "react-icons/fa";
import { AiOutlineLogin } from "react-icons/ai";
import { GiArchiveRegister } from "react-icons/gi";
/* import NavBar from './components/navBar/NavBar' */

function App() {
  const {cookies, logout, user} = useContext(SessionContext)
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate('/');
    logout();
  }

  
  return (
    <>
      <header>
        <nav>
        <h2 className='logoNav'><i>🏝️</i>Paradise Films</h2>
          <ul>            
            {cookies.user?'':<li><Link className="btnNav" to="/"><i><FaHome /></i> Home</Link> </li>}
            {cookies.user?'':<li><Link className="btnNav" to="/signup"><i><GiArchiveRegister /></i>Registro</Link></li>}
            {cookies.user?'':<li><Link className="btnNav" to="/login"><i><AiOutlineLogin /></i>Iniciar Sesión</Link></li>}            
            {cookies.user?<li><Link className="btnNav" to="/films"><i><GiFilmStrip /></i>Películas</Link></li>:''}
            {cookies.user?<li><Link className="btnNav" to="/series"><i><GiFilmStrip /></i>Series</Link></li>:''}
            {cookies.user && cookies.user.role === 'admin'?<li><Link className="btnNav" to="/admin-films"><i><GrUserAdmin /></i>Admin Films</Link></li>:''}  
            {cookies.user && cookies.user.role === 'admin'?<li><Link className="btnNav" to="/admin-users"><i><GrUserAdmin /></i>Admin Users</Link></li>:''}  
            {cookies.user?<li onClick={handleLogout}><Link className='logout'><i><AiOutlineLogout /></i>Logout</Link></li>: ''}            
          </ul>
        </nav>
      </header>
      <main>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/login" element={user? <Navigate to="/films"></Navigate> : <Login></Login>}></Route>
        <Route path="/signup" element={<Signup></Signup>}></Route>
        <Route path="/films" element={<Films></Films>}></Route>
        <Route path="/series" element={<Series></Series>}></Route>
        <Route path="/admin-films" element={<AdminFilms></AdminFilms>}></Route>
        <Route path="/admin-users" element={<AdminUsers></AdminUsers>}></Route>
      </Routes>
      </main>
    </>

  )
}

export default App


import { useContext} from 'react'
import { SessionContext } from './context/SessionProvider'
import {Link, Navigate, Route, Routes, useNavigate} from "react-router-dom"

import './App.css'
import Home from "./pages/home/Home"
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'
import Films from './pages/films/Films'
import AdminFilms from './pages/admin-films/Admin-films'
import AdminUsers from './pages/admin-users/Admin-users'



import { GiFilmStrip } from "react-icons/gi";
import { GiFilmSpool } from "react-icons/gi";
import { GrUserAdmin } from "react-icons/gr";
import { AiOutlineLogout } from "react-icons/ai";
import { FaHome } from "react-icons/fa";
import { AiOutlineLogin } from "react-icons/ai";
import { GiArchiveRegister } from "react-icons/gi";
/* import NavBar from './components/navBar/NavBar' */

function App() {
  const {logout, user} = useContext(SessionContext)
  const navigate = useNavigate();
  const handleLogout = () =>{
    navigate('/');
    logout();
  }
  return (
    <>
      <header>
        <nav>
        <h2 className='logoNav'>🏝️Paradise Films</h2>
          <ul>            
            {user?'':<li><Link className="btnNav" to="/"><FaHome />Home</Link> </li>}
            {user?'':<li><Link className="btnNav" to="/login"><AiOutlineLogin />Iniciar Sesión</Link></li>}
            {user?'':<li><Link className="btnNav" to="/signup"><GiArchiveRegister />Registro</Link></li>}
            {user?<li><Link className="btnNav" to="/films"><GiFilmStrip />Películas</Link></li>:''}
            {user?<li><Link className="btnNav" to="/series"><GiFilmSpool />Series</Link></li>:''}
            {user && user.role === 'admin'?<li><Link className="btnNav" to="/admin-films"><GrUserAdmin />Admin Films</Link></li>:''}  
            {user && user.role === 'admin'?<li><Link className="btnNav" to="/admin-users"><GrUserAdmin />Admin Users</Link></li>:''}  
            {user?<button onClick={handleLogout}><Link className='logout'><AiOutlineLogout />Logout</Link></button>: ''}            
          </ul>
        </nav>
      </header>
      <main>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/login" element={user ? <Navigate to="/films"></Navigate> : <Login></Login>}></Route>
        <Route path="/signup" element={<Signup></Signup>}></Route>
        <Route path="/films" element={<Films></Films>}></Route>
        <Route path="/series" element=""></Route>
        <Route path="/admin-films" element={<AdminFilms></AdminFilms>}></Route>
        <Route path="/admin-users" element={<AdminUsers></AdminUsers>}></Route>
      </Routes>
      </main>
    </>

  )
}

export default App

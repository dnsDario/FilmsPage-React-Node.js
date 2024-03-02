
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
          <ul>            
            {user?'':<li><Link className="btn btn-primary text-white no-underline" to="/">Home</Link> </li>}
            {user?'':<li><Link className="btn btn-primary text-white no-underline" to="/login">Iniciar Sesión</Link></li>}
            {user?'':<li><Link className="btn btn-primary text-white no-underline" to="/signup">Registro</Link></li>}
            {user?<li><Link className="btn btn-primary text-white no-underline" to="/films">Películas</Link></li>:''}
            {user?<li><Link className="btn btn-primary text-white no-underline" to="/series">Series</Link></li>:''}
            {user && user.role === 'admin'?<li><Link className="btn btn-primary text-white no-underline" to="/admin-films">Admin Films</Link></li>:''}  
            {user && user.role === 'admin'?<li><Link className="btn btn-primary text-white no-underline" to="/admin-users">Admin Users</Link></li>:''}  
            {user?<button className='btn btn-warning' onClick={handleLogout}>Logout</button>: ''}            
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

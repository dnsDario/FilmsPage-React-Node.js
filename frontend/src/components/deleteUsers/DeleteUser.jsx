import axios from "axios";
import { useState } from "react";
import "./DeleteUsers.css"
import { useContext } from "react";
import { SessionContext } from "../../context/SessionProvider";
export default function DeleteUsers() {
  const { user } = useContext(SessionContext);
  const [id, setId] = useState("");
  const [userDeleted, setUserDeleted] = useState(["No se ha borrado ningún usuario por el momento"]);
  
  
  
  function deleteUser(id){  
    axios.delete(`http://localhost:3000/api/users/${id}?token=${user.token}`)
      .then((response) => {
         console.log(response.data)
    })
  }
    

  return (
    <>
      <div className="titleInputAndButtonDeleteFilms">
        <h3>Borra un usuario</h3>
        <div className="inputAndButtonDeleteFilms">
        <input 
          type="text"
          placeholder="Introduzca ID del usuario que desea borrar"
          value={id}
          onChange={(e) => {
            setId(e.target.value);
          }}
        />
        <button
          className="btn btn-primary"
          onClick={(e) => {
            deleteUser(id);
          }}
        >
          Borrar Película
        </button>
        </div>
        <p className="inputAndButtonDeleteFilmsP">{userDeleted} </p>
        
      </div>
    </>
  );
}

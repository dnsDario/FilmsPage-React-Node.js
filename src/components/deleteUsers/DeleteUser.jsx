import axios from "axios";
import { useState } from "react";
import "./DeleteUsers.css"
import { useContext } from "react";
import { SessionContext } from "../../context/SessionProvider";
export default function DeleteUsers() {
  const { user } = useContext(SessionContext);
  const [id, setId] = useState("");
  
  function deleteUser(id){  
    let routeDeleteUserById = `https://paradise-films-backend.vercel.app/api/users/${id}?token=${user.token}`;
    console.log ('esta es la ruta delete',routeDeleteUserById)
    axios.delete(routeDeleteUserById)
      .then((response) => {
        setId('')
        alert(`El siguiente usuario fué eliminado:${JSON.stringify(response.data.userDeleted.name)} `);
        console.log('response es:', response.data)
        console.log(`El siguiente usuario fué eliminado:${JSON.stringify(response.data.userDeleted)} `)
    })
  }
    
  return (
    <>
      <div className="titleInputAndButtonDeleteUsers">
        <h3>Borrar usuarios por ID</h3>
        <div className="inputAndButtonDeleteUsers">
        <input 
          type="text"
          placeholder="Introduzca ID de usuario"
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
          Eliminar
        </button>
        </div>
      </div>
    </>
  );
}

import axios from "axios";
import { useState } from "react";
import "./DeleteFilms.css"
import { useContext } from "react";
import { SessionContext } from "../../context/SessionProvider";
export default function DeleteFilms() {
  const { user } = useContext(SessionContext);
  const [id, setId] = useState("");
  const [filmDeleted, setFilmDeleted] = useState(["No se ha borrado ninguna película por el momento"]);
  
  
  
  function deleteFilm(id){
    let routeDeleteFilmById = `http://localhost:3000/api/films/${id}?token=${user.token}`;
    console.log(`mi token es ${user.token} y el id ${id}`)
    axios.delete(routeDeleteFilmById)
      .then((response) => {
        setFilmDeleted(`La siguiente película fué eliminada:${JSON.stringify(response.data.filmDeleted.title)} `);
        console.log("La siguiente película fué eliminada: ", response.data.filmDeleted);
    })
  }
    

  return (
    <>
      <div className="titleInputAndButtonDeleteFilms">
        <h3>Borra una película de la colleción</h3>
        <div className="inputAndButtonDeleteFilms">
        <input 
          type="text"
          placeholder="Introduzca ID de la película que desea borrar"
          value={id}
          onChange={(e) => {
            setId(e.target.value);
          }}
        />
        <button
          className="btn btn-primary"
          onClick={(e) => {
            deleteFilm(id);
          }}
        >
          Borrar Película
        </button>
        </div>
        <p className="inputAndButtonDeleteFilmsP">{filmDeleted} </p>
        
      </div>
    </>
  );
}

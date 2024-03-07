import axios from "axios";
import { useState } from "react";
import "./DeleteFilms.css"
import { useContext } from "react";
import { SessionContext } from "../../context/SessionProvider";
export default function DeleteFilms() {
  const { user } = useContext(SessionContext);
  const [id, setId] = useState("");

  
  
  
  function deleteFilm(id){
    let routeDeleteFilmById = `http://localhost:3000/api/films/${id}?token=${user.token}`;
    axios.delete(routeDeleteFilmById)
      .then((response) => {
        setId('')
        alert(`La siguiente película fué eliminada:${JSON.stringify(response.data.filmDeleted.title)} `);
    })
  }
    

  return (
    <>
      <div className="titleInputAndButtonDeleteFilms">
        <h3>Borrar películas por ID</h3>
        <div className="inputAndButtonDeleteFilms">
          <input
            type="text"
            placeholder="Introduzca ID de la película"
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
            Eliminar
          </button>
        </div>
      </div>
    </>
  );
}

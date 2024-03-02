import { useEffect, useState } from "react";
import axios from "axios";
import SearcherAdmin from "../searcherAdmin/SearcherAdmin";
import { useContext } from "react";
import { SessionContext } from "../../context/SessionProvider";
import "./TableAdminFilms.css"
export default function TableAdminFilms(){
    const { user } = useContext(SessionContext);
    const [films, setFilms] = useState([])
    const [filtradasFilms, setFiltradasFilms] = useState([])

    useEffect(() => {
      axios
        .get(`http://localhost:3000/api/films?token=${user.token || ''}`)
        .then((response) => {
          const foundFilms = response.data.map((film) => ({
            id: film._id,
            title: film.title,
            img: film.img,
            director: film.director,
            category: film.category,
            synopsis: film.synopsis
          }));
          setFilms(foundFilms);
        })
        .catch((error) => {
          console.log("Error al obtener las películas:", error);
        });
    }, [user.token]);


    function filtrado(texto){
        let filtroFilms = films.filter((i)=> i.title.toLowerCase().includes(texto))
        setFiltradasFilms(filtroFilms)
    }


    return (
      <>
        
            <div className="buscador">
                <SearcherAdmin onFiltrar={filtrado}></SearcherAdmin>
                <table>
                <thead>
                    <tr>
                      <th>Imagen</th>
                      <th>ID</th>
                      <th>Título</th>
                      <th>Catagoría</th>
                      <th>Director</th>
                    </tr>
                </thead>
                <tbody>
                    {(filtradasFilms.length > 0? filtradasFilms:films).map ((x) => (
                    <tr key={x.id}>
                        <td>
                        <img src={x.img} alt={x.title} />
                        </td>
                        <td>{x.id}</td>
                        <td>{x.title}</td>
                        <td>{x.category}</td>
                        <td>{x.director}</td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
        
      </>
    );
}
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { SessionContext } from "../../context/SessionProvider";
import "./createFilms.css"
import axios from "axios";
import { useState } from "react";
export default function CreateFilms() {
  const { register, handleSubmit } = useForm();
  const { user } = useContext(SessionContext);
  const [filmCreated, setFilmCreated] = useState(["Rellene el formulario"]);

  function createFilm(datos) {
    let routePostFilmById = `https://paradise-films-backend.vercel.app/api/films?token=${user.token}`;
    axios.post(routePostFilmById, datos)
    .then((response) => {
        setFilmCreated(`La siguiente película fué creada: ${JSON.stringify(response.data.newFilm.title)}`)
      console.log(
        `La siguiente película fué creada: ${JSON.stringify(response.data.newFilm)}`)
    });
  }

  return (
    <>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-12">
            <div className="createFilms">
              <form onSubmit={handleSubmit(createFilm)}>
                <h3 className="titleForm">Añade peliculas a la colección</h3>
                <div className="mb-1">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Título
                  </label>
                  <input
                    type="text"
                    placeholder="Título de la película"
                    {...register("title", { required: true })}
                    className="form-control"
                    id="exampleInputTitle1"
                  />
                </div>
                <div className="mb-1">
                  <label htmlFor="exampleInputYear1" className="form-label">
                    Año
                  </label>
                  <input
                    type="number"
                    placeholder="Año de la película"
                    {...register("year", { required: true })}
                    className="form-control"
                    id="exampleInputAño1"
                  />
                </div>
                <div className="mb-1">
                  <label htmlFor="exampleInputImgr1" className="form-label">
                    Imagen
                  </label>
                  <input
                    type="string"
                    placeholder="Enlace de la imagen"
                    {...register("img", { required: true })}
                    className="form-control"
                    id="exampleInputImg1"
                  />
                </div>
                <div className="mb-1">
                  <label htmlFor="exampleInputDirector1" className="form-label">
                    Director
                  </label>
                  <input
                    type="string"
                    placeholder="Director de la película"
                    {...register("director", { required: true })}
                    className="form-control"
                    id="exampleInputDirector1"
                  />
                </div>
                <div className="mb-1">
                  <label htmlFor="exampleInputCategory1" className="form-label">
                    Categoría
                  </label>
                  <input
                    type="string"
                    placeholder="Categoría de la película"
                    {...register("category", { required: true })}
                    className="form-control"
                    id="exampleInputCategory1"
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="exampleInputSynopsis1" className="form-label">
                    Sinopsis
                  </label>
                  <input
                    type="string"
                    placeholder="Sinopsis de la película"
                    {...register("synopsis", { required: true })}
                    className="form-control"
                    id="exampleInputSynopsis1"
                  />
                </div>
                <div>
                <button type="submit" className="btn btn-primary">
                  Crear Película
                </button>
                <p>{filmCreated}</p>
                </div>
                
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
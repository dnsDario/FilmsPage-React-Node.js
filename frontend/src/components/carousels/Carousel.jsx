
"use client";
import React from "react";
import {useState, useEffect} from "react";
import { Carousel } from "keep-react";
import './Carousel.css'
import axios from "axios";
import { useContext } from "react";
import { SessionContext } from "../../context/SessionProvider";

export const CarouselFilms = () => {
  const { login } = useContext(SessionContext);
  const [films, setFilms] = useState([]);
  const rutaQueryToken = `http://localhost:3000/api/films?token=${login.token}`; //autenticación al solicitar films a la BD

  useEffect(() => {
    axios.get(rutaQueryToken).then((response) => {
      const newFilms = response.data.map((film) => ({
        title: film.title,
        img: film.img,
        year: film.year,
        category: film.category,
        descripcion: film.descripcion,
      }));
      setFilms(newFilms);
    }).catch((error) => {
      console.log("Error al obtener las películas:", error);
    });
  }, []);
  

  const moverCarrusel = React.useRef()

  function moverIzq(){
    moverCarrusel.current.scrollLeft -= 1093.824
  }
  function moverDcha(){
    moverCarrusel.current.scrollLeft += 1093.824
  }

  return (
    <>
      <div className="contenedor">
        <div className="carruselsSuperiores">
          <div className="carousel">
            <h2>Películas de Drama</h2>
            <Carousel
              slideInterval={3000}
              showControls={true}
              indicators={true}
            >
              {films
                .filter((i) => i.category.toLowerCase().includes("drama"))
                .map((i, idx) => (
                  <img key={idx} src={i.img} />
                ))}
            </Carousel>
          </div>
          <div className="carousel">
            <h2>Películas de Comedia</h2>
            <Carousel
              slideInterval={2000}
              showControls={true}
              indicators={true}
            >
              {films
                .filter((i) => i.category.toLowerCase().includes("comedia"))
                .map((i, idx) => (
                  <img key={idx} src={i.img} />
                ))}
            </Carousel>
          </div>
        </div>
        <div className="contenedor-peliculas-recomendadas">
          <div className="contenedor-titulo-controles">
            <h3>Peliculas Recomendadas</h3>
            <div className="indicadores"></div>
          </div>
          <div className="contenedor-principal">
            <button className="flecha-izquierda" onClick={moverIzq}>
              <i className="fa-solid fa-angle-left"></i>
            </button>
            <div className="contenedor-carousel" ref={moverCarrusel}>
              <div className="carousel">
                {films.map((i, idx) => (
                  <div className="pelicula" key={idx}>
                    {" "}
                    <a href="">
                      {" "}
                      <img src={i.img} alt="" />{" "}
                    </a>{" "}
                  </div>
                ))}
              </div>
            </div>
            <button className="flecha-derecha" onClick={moverDcha}>
              <i className="fa-solid fa-angle-right"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

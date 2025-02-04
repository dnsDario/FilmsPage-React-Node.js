
"use client";
import React from "react";
import {useState, useEffect} from "react";
import './Carousel.css'
import axios from "axios";
import { useContext } from "react";
import { SessionContext } from "../../context/SessionProvider";

export const CarouselFilms = () => {
  const { user } = useContext(SessionContext);
  const [films, setFilms] = useState([]);
  
  useEffect(() => {
    axios.get(`https://paradise-films-backend.vercel.app/api/films?token=${user.token}`).then((response) => {
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
  },[user.token]);
  

  const moverCarrusel = React.useRef()

  function moverIzq(){
    moverCarrusel.current.scrollLeft -= 1056
  }
  function moverDcha(){
    moverCarrusel.current.scrollLeft += 1056 //1320*0.8 para que la última por la derecha sea la primera por la izq.
  }

  return (
    <>
      <div className="contenedor">
        <div className="carruselsSuperiores">
          <div className="carousel">
            {/* <h2>Películas de Drama</h2>
            <Carousel
              className="carouselObject"
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
              className="carouselObject"
              slideInterval={2000}
              showControls={true}
              indicators={true}
            >
              {films
                .filter((i) => i.category.toLowerCase().includes("comedia"))
                .map((i, idx) => (
                  <img key={idx} src={i.img} />
                ))}
            </Carousel> */}
          </div>
        </div>
        <div className="contenedor-peliculas-recomendadas">
          <div className="contenedor-titulo-controles">
            <h2>Peliculas Recomendadas</h2>
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
        <h2>Todas las Películas</h2>
        <div className="contenedor-peliculas-coleccion">
          {films.map((i, idx) => (
            <div className="pelicula-coleccion" key={idx}>
              {" "}
              <a href="">
                {" "}
                <img src={i.img} alt="" />{" "}
              </a>{" "}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

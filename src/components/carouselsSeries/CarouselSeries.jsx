
"use client";
import React from "react";
import {useState, useEffect} from "react";
import '../carousels/Carousel.css'
import axios from "axios";
import { useContext } from "react";
import { SessionContext } from "../../context/SessionProvider";
import { Carousel } from "react-bootstrap";

export const CarouselSeries = () => {
  const { user } = useContext(SessionContext);
  const [series, setSeries] = useState([]);
  
  useEffect(() => {
    axios
      .get(`https://paradise-films-backend.vercel.app/api/series?token=${user.token}`)
      .then((response) => {
        const newSeries = response.data.map((serie) => ({
          title: serie.title,
          img: serie.img,
          year: serie.year,
          category: serie.category,
          descripcion: serie.descripcion,
        }));
        setSeries(newSeries);
      })
      .catch((error) => {
        console.log("Error al obtener las películas:", error);
      });
  }, [user.token]);
  

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
          <h2>Series de Drama</h2>
            <Carousel>
              {series
                .filter((i) => i.category.toLowerCase().includes("drama"))
                .map((i, idx) => (
                  <Carousel.Item>
                    <img key={idx} src={i.img} alt="imagen" className="carouselImg" />
                  </Carousel.Item>
                ))}
            </Carousel>
            </div>
            <div className="carousel">
            <h2>Series de Comedia</h2>
            <Carousel>
              {series
                .filter((i) => i.category.toLowerCase().includes("comedia"))
                .map((i, idx) => (
                  <Carousel.Item>
                    <img key={idx} src={i.img} alt="imagen" className="carouselImg"/>
                  </Carousel.Item>
                ))}
            </Carousel>
          </div>
        </div>
        <div className="contenedor-peliculas-recomendadas">
          <div className="contenedor-titulo-controles">
            <h2>Series Recomendadas</h2>
            <div className="indicadores"></div>
          </div>
          <div className="contenedor-principal">
            <button className="flecha-izquierda" onClick={moverIzq}>
              <i className="fa-solid fa-angle-left"></i>
            </button>
            <div className="contenedor-carousel" ref={moverCarrusel}>
              <div className="carousel_row">
                {series.map((i, idx) => (
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
        <h2>Todas las Series</h2>
        <div className="contenedor-peliculas-coleccion">
          {series.map((i, idx) => (
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

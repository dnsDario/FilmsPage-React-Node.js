import  { useState } from "react";
import './SignupForm.css'
import axios from 'axios'
import {useNavigate} from "react-router-dom"
import InputFormValidation from "../shared/InputFormValidation";

export default function SignupForm()  {
  const [datos, setDatos] = useState({name: "", email: "", password: "", repetirPassword: ""});
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    if (datos.password === datos.repetirPassword) {
      axios.post("http://localhost:3000/api/users/signup", datos)
      .then((response)=>{
        alert("Registrado con éxito")
        navigate("/login")
          console.log(response.data)
      })
      .catch((err)=>{
          console.log(err)
      })
    } else {
      alert("Las contraseñas no coinciden");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card-body">
            <div className="myForm">
            <div className="mb-3">
                <label htmlFor="exampleInputName" className="form-label">
                  Nombre
                </label>
                <input
                  type="text"
                  value={datos.name}
                  onChange={(e) => setDatos({ ...datos, name: e.target.value })}
                  className="form-control"
                  id="exampleInputName"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Correo Electrónico
                </label>
                <InputFormValidation
                  rules={[
                    {
                      text: <p>Email válido</p>,
                      fn: (p) =>
                        p.match(
                          /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
                        ),
                    },
                  ]}
                  type="email"
                  value={datos.email}
                  onChange={(e) =>
                    setDatos({ ...datos, email: e.target.value })
                  }
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                ></InputFormValidation>
                <div id="emailHelp" className="form-text">
                  <p>Nunca compartiremos tu correo electrónico con nadie más.</p>
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Contraseña
                </label>
                <InputFormValidation
                  rules={[
                    { text: <p className="msgAlert">No contiene números y letras</p>, fn: (p) => p.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]/)},
                    { text: <p className="msgAlert">La contraseña tiene menos de 8 caracteres</p>, fn: (p) => p.length >= 8 },
                  ]}
                  type="password"
                  value={datos.password}
                  onChange={(e) =>
                    setDatos({ ...datos, password: e.target.value })
                  }
                ></InputFormValidation>
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Repetir Contraseña
                </label>
                <InputFormValidation
                  rules={[
                    { text: <p className="msgAlert">No contiene números y letras</p>, fn: (p) => p.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]/)},
                    { text: <p className="msgAlert">La contraseña tiene menos de 8 caracteres</p>, fn: (p) => p.length >= 8 },
                  ]}
                  type="password"
                  value={datos.repetirPassword}
                  onChange={(e) =>
                    setDatos({ ...datos, repetirPassword: e.target.value })
                  }
                ></InputFormValidation>
              </div>
              <button
                onClick={handleSubmit}
                type="submit"
                className="btn btn-primary"
              >
                Registrarse
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


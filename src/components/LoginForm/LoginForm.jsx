import { useContext } from "react";
import "./LoginForm.css";
import { SessionContext } from "../../context/SessionProvider";
import axios from "axios";
import { useForm } from "react-hook-form";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm();
  /* const [datos, setDatos] = useState({email: "", password:""})  desaparece al meter la librería de formularios*/
  const { login } = useContext(SessionContext);

  
  function doLogin(datos) {
    axios
      .post("https://paradise-films-backend.vercel.app/api/users/login", datos)
      .then((response) => {
        console.log(response.data);
        login({ email: datos.email, token: response.data.token, role: response.data.role });
        datos = "";
      })
      .catch((err) => {
        console.log("error en las credenciales aportadas");
      });
  }

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="myForm">
            <form onSubmit={handleSubmit(doLogin)}>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
                <div id="emailHelp" className="form-text">
                  <p>Nunca compartiremos tu correo electrónico con nadie más.</p>
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Contraseña
                </label>
                <input
                  type="password"
                  {...register("password", { required: true, minLength: 8 })}
                  className="form-control"
                  id="exampleInputPassword1"
                />{" "}
                {errors.password?.type === "required" && (
                  <p>Este campo es obligatorio</p>
                )}
                {errors.password?.type === "minLength" && (
                  <p>La contraseña debe tener un mínimo de 8 caracteres</p>
                )}
              </div>
              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="exampleCheck1"
                />
                <label className="form-check-label" htmlFor="exampleCheck1">
                  Recuérdame
                </label>
              </div>
              <button type="submit" className="btn btn-primary">
                Iniciar Sesión
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
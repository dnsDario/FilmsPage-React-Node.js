import TableAdminFilms from "../../components/tableAdminFilms/TableAdminFilms";
import ActionsAdminFilms from "../../components/actionsAdminFilms/ActionsAdminFilms"
import './Admin-films.css'

export default function AdminFilms(){

    return (
      <>
        <div className="divAdmin">
          <h2>Bienvenido Admin</h2>
          <h3>
            En este área podrás crear o borrar las películas
            deseadas de la base de datos
          </h3>
          <div className="admin">
            <div className="crearBorrar">
              <ActionsAdminFilms></ActionsAdminFilms>
            </div>
            <div className="listaBuscadorFilms">
              <TableAdminFilms></TableAdminFilms>
            </div>                        
          </div>
          
        </div>
      </>
    );
}
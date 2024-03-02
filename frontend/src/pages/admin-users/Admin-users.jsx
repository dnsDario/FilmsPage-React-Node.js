import DeleteUsers from "../../components/deleteUsers/DeleteUser";
import TableAdminUsers from "../../components/tableAdminUsers/TableAdminUsers";
/* import ActionsAdminUsers from "../../components/actionsAdminUsers/actionsAdminUsers"; */
import './Admin-users.css'

export default function AdminUsers(){

    return (
      <>
        <div className="divAdmin">
          <h2>Bienvenido Admin</h2>
          <h3>
            En este área podrás buscar y borrar los usuarios deseados de la base de datos
          </h3>
          <div className="admin">
            <div className="listaBuscador">
              <TableAdminUsers></TableAdminUsers>
            </div>
            <div className="crearBorrar">
              <DeleteUsers></DeleteUsers>
            </div>            
          </div>
        </div>
      </>
    );
}
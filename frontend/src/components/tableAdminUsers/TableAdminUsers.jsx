import { useEffect, useState } from "react";
import axios from "axios";
import SearcherAdmin from "../searcherAdmin/SearcherAdmin";
import { useContext } from "react";
import { SessionContext } from "../../context/SessionProvider";
import "./TableAdminUsers.css";

export default function TableAdminUsers() {
  const { user } = useContext(SessionContext);
    const [users, setUsers] = useState([])
    const [filtradosUsers, setFiltradosUsers] = useState([])
 //autenticación mediante rol al solicitar users a la BD

    useEffect(() => {
      axios
        .get(`http://localhost:3000/api/users?token=${user.token || ''}`)
        .then((response) => {
          const foundUsers = response.data.map((user) => ({
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
          }));
          setUsers(foundUsers);
        })
        .catch((error) => {
          console.log("Error al obtener los usuarios:", error);
        });
    }, [user.token]);


    function filtradoUsers(texto){
        let filtroUsers = users.filter((i)=> i.name.toLowerCase().includes(texto))
        setFiltradosUsers(filtroUsers)
    }


    return (
      <>
        
            <div className="buscador">
                <SearcherAdmin onFiltrar={filtradoUsers}></SearcherAdmin>
                <table>
                <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nombre</th>
                      <th>Email</th>
                      <th>Rol</th>
                    </tr>
                </thead>
                <tbody>
                    {(filtradosUsers.length > 0? filtradosUsers:users).map ((x) => (
                    <tr key={x.id}>
                        <td>{x.id}</td>
                        <td>{x.name}</td>
                        <td>{x.email}</td>
                        <td>{x.role}</td>

                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
        
      </>
    );
}
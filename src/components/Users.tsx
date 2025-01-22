import React from "react";

interface Usuario {
  id: number;
  userName: string;
  role: "publicador" | "administrador";
}

interface Props {
  usuarios: Usuario[];
}

const Users: React.FC<Props> = ({ usuarios }) => {
  return (
    <div>
      <h1>Usuarios Creados</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre de Usuario</th>
            <th>Rol</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.id}</td>
              <td>{usuario.userName}</td>
              <td>{usuario.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;

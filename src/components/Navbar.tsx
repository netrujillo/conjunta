import React from "react";
import { Link, useNavigate } from "react-router-dom";

interface Usuario {
    id: number;
    userName: string;
    password: string;
    role: "publicador" | "administrador";
}

interface Props {
  onLogout: () => void;
  currentUser: Usuario;
}

const Navbar: React.FC<Props> = ({ onLogout, currentUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };

  return (
    <nav>
      <Link to="/">Inicio</Link> &nbsp;
      <Link to="/about">Acerca De</Link> &nbsp;
      <Link to="/posts">Posts</Link> &nbsp;

      {currentUser.role === "administrador" && (
        <>
          <Link to="/users">Usuarios Creados</Link> &nbsp;
        </>
      )}

      <button onClick={handleLogout}>Cerrar Sesión</button>
    </nav>
  );
};

export default Navbar;

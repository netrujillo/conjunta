import React from "react";
import { Link, useNavigate } from "react-router-dom";

interface Props {
  onLogout: () => void;
  role: string;
}

const Navbar: React.FC<Props> = ({ onLogout, role }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };

  return (
    <nav>
      <Link to="/">Inicio</Link>
      {role === "admin" && <Link to="/users">Usuarios</Link>}
      <Link to="/posts">Publicaciones</Link>
      <Link to="/comments">Comentarios</Link>
      <Link to="/register">Registro</Link>
      <Link to="/acerca_de">Acerca de</Link>
      <button onClick={handleLogout}>Cerrar Sesión</button>
    </nav>
  );
};

export default Navbar;


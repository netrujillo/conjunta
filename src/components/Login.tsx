import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

interface Usuario {
    id: number;
    userName: string;
    password: string;
    role: "publicador" | "administrador";
}

interface Props {
  onLogin: (user: Usuario) => void;
}

const Login: React.FC<Props> = ({ onLogin }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem("usuarios") || "[]");
    const user = users.find((user: Usuario) => user.userName === userName && user.password === password);

    if (user) {
      onLogin(user);
      navigate("/");
    } else {
      setError("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div>
      <h2>Iniciar sesión</h2>
      <input type="text" placeholder="Usuario" value={userName} onChange={(e) => setUserName(e.target.value)} />
      <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
      <p>{error}</p>
      <Link to="/register">Crear cuenta</Link>
    </div>
  );
};

export default Login;

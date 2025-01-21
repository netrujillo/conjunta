import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface LoginProps {
  onLogin: (role: "Publicador" | "Administrador") => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"Publicador" | "Administrador">("Publicador");
  const navigate = useNavigate();

  const handleLogin = () => {
    // Simulación de autenticación, aquí deberías agregar la lógica real
    onLogin(role); // Pasa el rol al componente App
    navigate("/"); // Redirige al inicio después de iniciar sesión
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <select value={role} onChange={(e) => setRole(e.target.value as "Publicador" | "Administrador")}>
        <option value="Publicador">Publicador</option>
        <option value="Administrador">Administrador</option>
      </select>
      <button onClick={handleLogin}>Iniciar sesión</button>
    </div>
  );
};

export default Login;



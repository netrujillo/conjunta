import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface User {
  username: string;
  password: string;
  role: "Publicador" | "Administrador";
}

const Register: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"Publicador" | "Administrador">("Publicador");
  const navigate = useNavigate(); // Usamos useNavigate en lugar de useHistory

  const handleRegister = () => {
    const storedUsers: User[] = JSON.parse(localStorage.getItem("users") || "[]");
    const newUser = { username, password, role };
    storedUsers.push(newUser);
    localStorage.setItem("users", JSON.stringify(storedUsers));
    navigate("/login");
  };

  return (
    <div>
      <h2>Registrar Usuario</h2>
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
      <button onClick={handleRegister}>Registrar</button>
    </div>
  );
};

export default Register;



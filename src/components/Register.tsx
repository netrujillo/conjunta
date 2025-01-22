import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Usuario {
    id: number;
    userName: string;
    password: string;
    role: "publicador" | "administrador";
}

interface Props {
  onRegister: (newUser: Usuario) => void;
}

const Register: React.FC<Props> = ({ onRegister }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"publicador" | "administrador">("publicador");

  const navigate = useNavigate();

  const handleRegister = () => {
    const newUser: Usuario = {
      id: Date.now(),
      userName,
      password,
      role,
    };

    onRegister(newUser);
    navigate("/login");
  };

  return (
    <div>
      <h2>Crear Cuenta</h2>
      <input type="text" placeholder="Usuario" value={userName} onChange={(e) => setUserName(e.target.value)} />
      <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
      <select onChange={(e) => setRole(e.target.value as "publicador" | "administrador")}>
        <option value="publicador">Publicador</option>
        <option value="administrador">Administrador</option>
      </select>
      <button onClick={handleRegister}>Registrar</button>
    </div>
  );
};

export default Register;
import React, { useState } from "react";

interface Usuario {
  id: number;
  nombre: string;
  email: string;
  rol: "Publicador" | "Administrador";
}

const GestionUsuarios: React.FC = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [nombre, setNombre] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [rol, setRol] = useState<"Publicador" | "Administrador">("Publicador");

  const agregarUsuario = () => {
    if (nombre.trim() && email.trim()) {
      // Crea un nuevo objeto usuario.
      const nuevoUsuario: Usuario = {
        // Genera un ID único usando la marca de tiempo actual.
        id: Date.now(),
        // Asigna el valor del estado nombre al nuevo usuario.
        nombre,
        // Asigna el valor del estado email al nuevo usuario.
        email,
        rol, // Asigna el rol seleccionado al nuevo usuario
      };
      // Actualiza el estado usuarios añadiendo el nuevo usuario al array existente.
      // ...usuarios crea una copia del array usuarios y nuevoUsuario se añade al final.
      setUsuarios([...usuarios, nuevoUsuario]);
      // Limpia los campos del formulario después de agregar el usuario.
      setNombre('');
      setEmail('');
      setRol("Publicador"); // Restablece el rol a "Publicador" después de agregar un usuario
    } else {
      // Muestra una alerta si los campos nombre o email están vacíos.
      alert('Nombre y email son requeridos');
    }
  };

  // Función para eliminar un usuario de la lista por su ID.
  const eliminarUsuario = (id: number) => {
    // Filtra el array usuarios, creando un nuevo array que contiene todos los usuarios
    // cuyo ID es diferente al ID proporcionado.
    const usuariosFiltrados = usuarios.filter((usuario) => usuario.id !== id);
    // Actualiza el estado usuarios con el nuevo array filtrado, eliminando así el usuario.
    setUsuarios(usuariosFiltrados);
  };

  return (
    <div>
      <h1>Gestion de Usuarios</h1>
      <div className="formulario">
        <input
          type="text"
          placeholder="Nombre"
          // Vincula el valor del input al estado nombre.
          value={nombre}
          // Actualiza el estado nombre cada vez que el valor del input cambia.
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          // Vincula el valor del input al estado email.
          value={email}
          // Actualiza el estado email cada vez que el valor del input cambia.
          onChange={(e) => setEmail(e.target.value)}
        />
        <select value={rol} onChange={(e) => setRol(e.target.value)}> {/* Dropdown para seleccionar el rol */}
          <option value="Publicador">Publicador</option>
          <option value="Administrador">Administrador</option>
        </select>
        <button onClick={agregarUsuario}>Guardar</button>
      </div>
      <h2>Lista de Usuarios</h2>
      <ul>
        {/* Itera sobre el array usuarios y renderiza un elemento li para cada usuario. */}
        {usuarios.map((usuario) => (
          // key es obligatorio en React para optimizar la renderización de listas.
          <li key={usuario.id}>
            {/* Muestra la información del usuario. */}
            {usuario.id} - {usuario.nombre} - {usuario.email} - {usuario.rol}
             {/* Renderiza el botón de eliminar solo para administradores */}
            {usuario.rol === "Administrador" && (
              <button onClick={() => eliminarUsuario(usuario.id)}>Eliminar</button>
            )}
          </li>
        ))}
      </ul>
      {/* Sección de administrador, visible solo si hay al menos un administrador. */}
      {usuarios.some((usuario) => usuario.rol === "Administrador") && (
        <div>
          <h2>Sección de Administrador</h2>
          <p>Lista de Usuarios Registrados</p>
          <ul>
          {/* Muestra la lista de todos los usuarios en la sección de administrador */}
            {usuarios.map((usuario) => (
              <li key={usuario.id}>
                {usuario.id} - {usuario.nombre} - {usuario.email}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default GestionUsuarios
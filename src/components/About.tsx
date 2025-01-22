import React from "react";

const teamMembers = [
  {
    name: "Mateo Pérez",
    role: "Desarrollador Frontend",
    image: "https://cdn-icons-png.flaticon.com/512/43/43368.png",
    description: "Masteo es responsable de crear interfaces intuitivas y funcionales utilizando tecnologías como React y TypeScript.",
  },
  {
    name: "Nicole Trujillo",
    role: "Desarrolladora Backend",
    image: "https://cdn-icons-png.flaticon.com/512/45/45943.png",
    description: "Nicole se encarga del diseño y desarrollo de la lógica backend, utilizando Node.js y bases de datos como MongoDB.",
  },
];

const About: React.FC = () => {
  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Acerca de EduConnect</h1>
      <p>EduConnect es una plataforma de red social creada para estudiantes y docentes de universidades.</p>
      <p>
        Su propósito es fomentar la interacción académica, el intercambio de conocimientos y la colaboración entre miembros de diferentes
        instituciones educativas.
      </p>

      <h2>Miembros del equipo</h2>
      <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
        {teamMembers.map((member) => (
          <div
            key={member.name}
            style={{
              margin: "20px",
              padding: "15px",
              borderRadius: "8px",
              backgroundColor: "#4b3f35",
              color: "white",
              width: "250px",
              textAlign: "center",
            }}
          >
            <img
              src={member.image}
              alt={member.name}
              style={{ borderRadius: "50%", width: "100px", height: "100px", marginBottom: "10px" }}
            />
            <h3>{member.name}</h3>
            <p><strong>{member.role}</strong></p>
            <p>{member.description}</p>
          </div>
        ))}
      </div>

      <h2>Contacto</h2>
      <p>Para más información o soporte, puedes contactarnos a través de nuestro correo: <a href="mailto:support@educonnect.com">support@educonnect.com</a></p>
    </div>
  );
};

export default About;

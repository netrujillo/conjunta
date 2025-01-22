import React from "react";

const teamMembers = [
  {
    name: "Mateo Pérez",
    role: "Desarrollador Frontend",
    image: "https://cdn-icons-png.flaticon.com/512/43/43368.png",
    description: "Mateo es responsable de crear interfaces intuitivas y funcionales utilizando tecnologías como React y TypeScript.",
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
    <div className="about-container">
      <h1>Acerca de EduConnect</h1>
      <p>EduConnect es una plataforma de red social creada para estudiantes y docentes de universidades.</p>
      <p>
        Su propósito es fomentar la interacción académica, el intercambio de conocimientos y la colaboración entre miembros de diferentes
        instituciones educativas.
      </p>

      <h2>Miembros del equipo</h2>
      <div className="team-container">
        {teamMembers.map((member) => (
          <div key={member.name} className="team-card">
            <img src={member.image} alt={member.name} className="team-image" />
            <h3>{member.name}</h3>
            <p><strong>{member.role}</strong></p>
            <p>{member.description}</p>
          </div>
        ))}
      </div>

      <h2>Contacto</h2>
      <p>
        Para más información o soporte, puedes contactarnos a través de nuestro correo:{" "}
        <a href="mailto:support@educonnect.com">support@educonnect.com</a>
      </p>
    </div>
  );
};

export default About;

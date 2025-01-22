import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import Posts from "./components/Posts";
import About from "./components/About";
import Users from "./components/Users";
import Inicio from "./components/Inicio";
import "./components/Estilo.css";

interface Usuario {
  id: number;
  userName: string;
  password: string;
  role: "publicador" | "administrador";
}

interface Post {
  id: number;
  content: string;
  comments: string[];
  userId: number;
}

const App: React.FC = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentUser, setCurrentUser] = useState<Usuario | null>(null);

  useEffect(() => {
    const storedUsuarios = localStorage.getItem("usuarios");
    const storedPosts = localStorage.getItem("posts");

    if (storedUsuarios) setUsuarios(JSON.parse(storedUsuarios));
    if (storedPosts) setPosts(JSON.parse(storedPosts));
  }, []);

  const handleLogin = (user: Usuario) => {
    setCurrentUser(user);
    localStorage.setItem("currentUser", JSON.stringify(user));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
  };

  const handleRegister = (newUser: Usuario) => {
    setUsuarios([...usuarios, newUser]);
    localStorage.setItem("usuarios", JSON.stringify([...usuarios, newUser]));
  };

  return (
    <Router>
      {currentUser && <Navbar onLogout={handleLogout} currentUser={currentUser} />}
      
      <div style={{ padding: "20px" }}>
        <Routes>
          <Route path="/" element={currentUser ? <Inicio /> : <Navigate to="/login" />} />

          <Route path="/login" element={<Login onLogin={handleLogin} />} />

          <Route path="/register" element={<Register onRegister={handleRegister} />} />

          <Route path="/posts" element={currentUser ? <Posts posts={posts} setPosts={setPosts} currentUser={currentUser} /> : <Navigate to="/login" />} />

          <Route
            path="/users"
            element={currentUser?.role === "administrador" ? <Users usuarios={usuarios} /> : <Navigate to="/" />}
          />

          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
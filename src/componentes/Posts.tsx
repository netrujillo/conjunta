import React, { useState, useEffect } from "react";

const Posts: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [newPost, setNewPost] = useState("");

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem("posts") || "[]");
    setPosts(storedPosts);
  }, []);

  const handleCreatePost = () => {
    const storedPosts = JSON.parse(localStorage.getItem("posts") || "[]");
    const post = { id: Date.now(), content: newPost };
    storedPosts.push(post);
    localStorage.setItem("posts", JSON.stringify(storedPosts));
    setPosts(storedPosts);
    setNewPost("");
  };

  const handleDeletePost = (postId: number) => {
    const storedPosts = JSON.parse(localStorage.getItem("posts") || "[]");
    const filteredPosts = storedPosts.filter((post: any) => post.id !== postId);
    localStorage.setItem("posts", JSON.stringify(filteredPosts));
    setPosts(filteredPosts);
  };

  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser") || "{}");

  return (
    <div>
      <h2>Publicaciones</h2>
      {loggedInUser.role === "Publicador" && (
        <div>
          <input
            type="text"
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="Escribe una nueva publicación"
          />
          <button onClick={handleCreatePost}>Crear Post</button>
        </div>
      )}
      <ul>
        {posts.map((post: any) => (
          <li key={post.id}>
            {post.content}
            {loggedInUser.role === "Administrador" && (
              <button onClick={() => handleDeletePost(post.id)}>Eliminar</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Posts;

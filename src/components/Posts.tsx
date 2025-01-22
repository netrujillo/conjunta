import React, { useState } from "react";

interface Post {
  id: number;
  content: string;
  comments: string[];
  userId: number;
}

interface Usuario {
    id: number;
    userName: string;
    password: string;
    role: "publicador" | "administrador";
}

interface Props {
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  currentUser: Usuario;
}

const Posts: React.FC<Props> = ({ posts, setPosts, currentUser }) => {
  const [content, setContent] = useState("");
  const [comments, setComments] = useState<{ [key: number]: string }>({});

  const handlePost = () => {
    const newPost: Post = {
      id: Date.now(),
      content,
      comments: [],
      userId: currentUser.id,
    };

    setPosts([...posts, newPost]);
    localStorage.setItem("posts", JSON.stringify([...posts, newPost]));
    setContent(""); // Limpiar el campo después de publicar
  };

  const handleDeletePost = (postId: number) => {
    if (currentUser.role === "administrador") {
      const updatedPosts = posts.filter((post) => post.id !== postId);
      setPosts(updatedPosts);
      localStorage.setItem("posts", JSON.stringify(updatedPosts));
    }
  };

  const handleDeleteComment = (postId: number, commentIndex: number) => {
    if (currentUser.role === "administrador") {
      const updatedPosts = posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: post.comments.filter((_, index) => index !== commentIndex),
            }
          : post
      );
      setPosts(updatedPosts);
      localStorage.setItem("posts", JSON.stringify(updatedPosts));
    }
  };

  const handleCommentChange = (postId: number, e: React.ChangeEvent<HTMLInputElement>) => {
    setComments((prevComments) => ({
      ...prevComments,
      [postId]: e.target.value,
    }));
  };

  const handleAddComment = (postId: number) => {
    const post = posts.find((post) => post.id === postId);
    if (post) {
      const updatedPosts = posts.map((p) =>
        p.id === postId
          ? { ...p, comments: [...p.comments, comments[postId]] }
          : p
      );
      setPosts(updatedPosts);
      localStorage.setItem("posts", JSON.stringify(updatedPosts));
      setComments((prevComments) => ({ ...prevComments, [postId]: "" }));
    }
  };

  return (
    <div>
      <h1>Publicaciones</h1>
      <textarea value={content} onChange={(e) => setContent(e.target.value)} />
      <button onClick={handlePost}>Publicar</button>

      <div>
        {posts.map((post) => (
          <div key={post.id}>
            <p>{post.content}</p>
            <ul>
              {post.comments.map((comment, index) => (
                <li key={index}>
                  {comment}{" "}
                  {currentUser.role === "administrador" && (
                    <button onClick={() => handleDeleteComment(post.id, index)}>
                      Eliminar Comentario
                    </button>
                  )}
                </li>
              ))}
            </ul>
            <input
              type="text"
              value={comments[post.id] || ""}
              onChange={(e) => handleCommentChange(post.id, e)}
              placeholder="Comentar..."
            />
            <button onClick={() => handleAddComment(post.id)}>Comentar</button>
            {currentUser.role === "administrador" && (
              <button onClick={() => handleDeletePost(post.id)}>Eliminar Publicación</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;




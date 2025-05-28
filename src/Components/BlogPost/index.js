import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ChatBot from "../Chatbot";

import "./index.css";

const BlogPost = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // For handling any errors

  // Fetching data from the API
  useEffect(() => {
    const fetchData = async () => {
      const url = "https://blog-api-qyqz.onrender.com/getAllPosts";
      // const url = "http://localhost:5000/getAllPosts";
      const options = {
        method: "GET",
      };

      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error("Failed to fetch posts.");
        }
        const data = await response.json();
        console.log(data);

        // Check if the response is empty or not
        if (data.length === 0) {
          setError("No posts available.");
        } else {
          setPosts(data);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("An error occurred while fetching posts.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Getting the post ID from URL parameters
  const { id } = useParams();

  // Find the post that matches the ID
  const nowCard = posts.find((post) => post.id === id);
  console.log(nowCard);

  if (loading) {
    return <div className="loading">Loading posts...</div>;
  }

  if (error) {
    return <div className="loading">{error}</div>;
  }

  if (!nowCard) {
    return <div className="loading">Post not found!</div>;
  }

  return (
    <div className="blog-post-container">
      <Link to={"/addblog"}>
        <button className="write-blog-button">Write Your own Blog</button>
      </Link>
      <h1>{nowCard.title}</h1>
      <p>{nowCard.date}</p>
      <img src={nowCard.image} alt={nowCard.title} />
      <p>{nowCard.description}</p>
      <div className="tags">
        {nowCard.tags.split(",").map((tag, index) => (
          <span key={index} className={`tag tag-blue`}>
            {tag.trim()}
          </span>
        ))}
      </div>
      <ChatBot />
    </div>
  );
};

export default BlogPost;

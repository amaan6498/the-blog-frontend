import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HorizontalCard from "../HorizontalCard";
import ChatBot from "../Chatbot";

import "./index.css";

const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const url = "https://blog-api-qyqz.onrender.com/getAllPosts";
      // const url = "http://localhost:5000/getAllPosts";
      const options = {
        method: "GET",
      };

      try {
        const response = await fetch(url, options);
        const data = await response.json();
        console.log(data);
        setPosts(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false);
    };

    fetchData();
  }, []); // The empty array ensures this runs once when the component mounts

  const onChangeSearch = (e) => {
    const query = e.target.value.toLowerCase();
    // Filter posts based on search query (Assuming each post has a 'title' field)
    setPosts((prevPosts) =>
      prevPosts.filter((post) => post.title.toLowerCase().includes(query))
    );
  };

  return (
    <div className="allposts-container">
      <div className="search-posts">
        <form className="search-form">
          <input
            type="search"
            className="search-input-allpost"
            placeholder="Search for posts"
            onChange={onChangeSearch}
          />
        </form>
      </div>

      {loading ? (
        <div className="loading">Loading posts...</div>
      ) : (
        <div className="all-posts">
          {posts.length > 0 ? (
            posts.map((card) => (
              <Link to={`/blog/${card.id}`} key={card.id} className="link">
                <HorizontalCard key={card.id} card={card} />
              </Link>
            ))
          ) : (
            <div className="no-posts">No posts found</div>
          )}
        </div>
      )}
      <ChatBot />
    </div>
  );
};

export default AllPosts;

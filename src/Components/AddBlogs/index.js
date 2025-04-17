import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./index.css";

const AddBlogs = () => {
  const [name, setName] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const todayDate = new Date();
    const options = { day: "2-digit", month: "short", year: "numeric" };
    const formatted = todayDate.toLocaleDateString("en-GB", options);
    setDate(formatted);

    const userhere = Cookies.get("yourUserName");
    setTags(userhere);

    const token = Cookies.get("jwt_token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const onSubmitForm = async (event) => {
    event.preventDefault();

    if (!name || !imgUrl || !description || !tags || !date) {
      setError("Please fill all the fields.");
      return;
    }

    const blogData = {
      name,
      imgUrl,
      description,
      tags,
      date,
    };

    try {
      const response = await fetch("http://localhost:5000/addblog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(blogData),
        mode: "cors",
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Something went wrong!");
      } else {
        alert("Blog added successfully!");
        navigate("/allposts");
      }
    } catch (err) {
      console.error("Error:", err);
      setError("A network error occurred. Please try again.");
    }
  };

  return (
    <div className="add-blog-container">
      <h1 className="add-blog-heading">Add a Blog</h1>
      <p className="add-blog-subtitle">Share your thoughts with the world</p>
      <form className="add-blog-form" onSubmit={onSubmitForm}>
        <label htmlFor="name" className="add-blog-label">
          Blog Name
        </label>
        <input
          id="name"
          type="text"
          placeholder="Enter blog title"
          className="add-blog-input"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="imgUrl" className="signup-form">
          Image URL
        </label>
        <input
          id="imgUrl"
          type="text"
          placeholder="Paste image URL"
          className="add-blog-input"
          value={imgUrl}
          required
          onChange={(e) => setImgUrl(e.target.value)}
        />

        <label htmlFor="description" className="signup-form">
          Description
        </label>
        <textarea
          id="description"
          placeholder="Write your blog content here..."
          className="add-blog-textarea"
          rows="5"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>

        <label htmlFor="tags" className="signup-form">
          User Tag
        </label>
        <input
          id="tags"
          type="text"
          placeholder="e.g. travel, tech"
          className="add-blog-input"
          value={tags}
        />

        <label htmlFor="date" className="signup-form">
          Date
        </label>
        <input
          id="date"
          type="text"
          className="add-blog-input"
          value={date}
          readOnly
        />

        <button type="submit" className="add-blog-button">
          Post Blog
        </button>

        {error && (
          <p className="add-blog-error" style={{ color: "red" }}>
            {error}
          </p>
        )}
      </form>
    </div>
  );
};

export default AddBlogs;

import { Routes, Route } from "react-router-dom";
import NavBar from "./Components/NavBar";
import Home from "./Components/Home";
import About from "./Components/About";
import Contact from "./Components/Contact";
import Login from "./Components/Login";
import Signup from "./Components/SignUp";
import BlogPost from "./Components/BlogPost";
import AllPosts from "./Components/AllPosts";
import AddBlogs from "./Components/AddBlogs";
import Footer from "./Components/Footer";

import "./App.css";

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/allposts" element={<AllPosts />} />
        <Route path="/blog/:id" element={<BlogPost />} />
        <Route path="/addblog" element={<AddBlogs />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

import ChatBot from "../Chatbot";

import "./index.css";

const Contact = () => {
  return (
    <div className="contact-container">
      <h1 className="contact-title">Contact Us</h1>
      <form
        className="contact-form"
        action="mailto:amman.ammou2012@gmail.com"
        method="POST"
        encType="multipart/form-data"
      >
        <label htmlFor="email" className="contact-form-label">
          Email
        </label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="Email"
          className="contact-input"
          required
        />
        <label htmlFor="message" className="contact-form-label">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          cols="30"
          rows="5"
          placeholder="Your message"
          className="contact-input"
          required
        ></textarea>
        <button type="submit">Submit</button>
      </form>
      <ChatBot />
    </div>
  );
};

export default Contact;

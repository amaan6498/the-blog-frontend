import React from "react";
import "./index.css";

const HorizontalCard = ({ card }) => {
  const { image, date, title, description, tags } = card;
  const truncatedDescription =
    description.length > 100
      ? description.substring(0, 100) + "..."
      : description;
  return (
    <div className="card">
      <img src={image} alt={title} className="card-image" />

      <div className="card-content">
        <p className="card-date">{date}</p>
        <h2 className="card-title">{title}</h2>
        <p className="card-description">{truncatedDescription}</p>

        <div className="card-tags">
          <span className={`tag tag-purple`}>{tags}</span>
        </div>
      </div>
    </div>
  );
};

export default HorizontalCard;

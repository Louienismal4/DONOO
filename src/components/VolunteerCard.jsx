import React, { useEffect, useState } from "react";
import Vibrant from "node-vibrant/lib/bundle";
import { supabase } from "../supabaseClient";
import "./VolunteerCard.css";

const lightenColor = (hex, percent) => {
  const num = parseInt(hex.slice(1), 16),
    amt = Math.round(5 * percent),
    R = (num >> 16) + amt,
    G = ((num >> 8) & 0x00ff) + amt,
    B = (num & 0x0000ff) + amt;

  return `#${(
    0x1000000 +
    (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
    (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
    (B < 255 ? (B < 1 ? 0 : B) : 255)
  )
    .toString(16)
    .slice(1)
    .toUpperCase()}`;
};

function VolunteerCard({
  id,
  title,
  description,
  imageUrl,
  likes,
  location,
  email,
  contact,
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [bgGradient, setBgGradient] = useState("grey");
  const [likeCount, setLikeCount] = useState(likes || 0);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    Vibrant.from(imageUrl)
      .getPalette()
      .then((palette) => {
        if (palette) {
          const vibrantColor = palette.Vibrant
            ? palette.Vibrant.getHex()
            : "#ccc";
          const mutedColor = palette.Muted ? palette.Muted.getHex() : "#999";
          const lightVibrant = lightenColor(vibrantColor, 30);
          const lightMuted = lightenColor(mutedColor, 30);
          setBgGradient(
            `linear-gradient(135deg, ${lightVibrant}, ${lightMuted})`
          );
        } else {
          console.error("Error: No palette extracted");
        }
      })
      .catch((err) => {
        console.error("Error extracting colors:", err);
      });
  }, [imageUrl]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleLike = async () => {
    const newLikeStatus = !isLiked;
    const newLikeCount = newLikeStatus ? likeCount + 1 : likeCount - 1;

    try {
      const { data, error } = await supabase
        .from("posts")
        .update({ likes: newLikeCount })
        .eq("id", id);

      if (error) throw error;

      setIsLiked(newLikeStatus);
      setLikeCount(newLikeCount);
    } catch (err) {
      console.error("Error updating likes:", err);
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h3>{title}</h3>
        <div className="menu-icon">●●●</div>
      </div>
      <br />
      <p>
        {isExpanded ? description : `${description.substring(0, 50)}...`}
        <span className="see-more" onClick={toggleExpand}>
          {isExpanded ? "See less" : "See more"}
        </span>
      </p>
      {isExpanded && (
        <div className="extra-info">
          <div className="extra-info-item">
            <img src="map.png" alt="Location icon" className="icon" />
            <p>{location}</p>
          </div>
          <div className="extra-info-item">
            <img src="Letter.png" alt="Email icon" className="icon" />
            <p>Email: {email}</p>
          </div>
          <div className="extra-info-item">
            <img src="phone.png" alt="Contact icon" className="icon" />
            <p>Contact no: {contact}</p>
          </div>
        </div>
      )}
      <br />
      <div
        className={`card-image-container ${isLoaded ? "unblur" : "blur"}`}
        onClick={toggleExpand}
      >
        <div
          className={`card-image ${isLoaded ? "unblur" : "blur"}`}
          style={{ backgroundImage: bgGradient }}
        >
          <img src={imageUrl} alt={title} />
        </div>
      </div>
      <div className="card-footer">
        <img
          onClick={toggleLike}
          src={isLiked ? "heart.png" : "heart (1).png"}
          alt={isLiked ? "Liked" : "Not liked"}
          className="like-icon"
        />
        <span>{likeCount}</span>
      </div>
    </div>
  );
}

export default VolunteerCard;

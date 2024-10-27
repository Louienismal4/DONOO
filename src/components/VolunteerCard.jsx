import React, { useEffect, useState } from "react";
import Vibrant from "node-vibrant/lib/bundle";
import { supabase } from "../supabaseClient";
import { useLocation } from "react-router-dom";
import "./VolunteerCard.css";
import AlertDialog from "./AlertDialog";
import EditPostModal from "./EditPostModal"; // Import the EditPostModal component

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
  const [isAdmin, setIsAdmin] = useState(false);
  const [showMenu, setShowMenu] = useState(false); // State to toggle dropdown menu visibility
  const locations = useLocation();
  const [showAlertDialog, setShowAlertDialog] = useState(false); // State for the alert dialog  const [showAlertDialog, setShowAlertDialog] = useState(false); // State for the alert dialog
  const [showEditModal, setShowEditModal] = useState(false); // State to control the edit modal visibility

  const checkAdminStatus = async () => {
    try {
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", "1499178b-d345-45fb-b8b7-b344f14f4981");

      if (error) {
        throw error;
      }

      if (data && data.length > 0 && data[0].role === "admin") {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    } catch (err) {
      console.error("Error fetching user role:", err);
    }
  };

  useEffect(() => {
    checkAdminStatus();
  }, []);

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

  const handleMenuClick = () => {
    setShowMenu(!showMenu); // Toggle the visibility of the menu
  };
  const handleDelete = async () => {
    try {
      const { error } = await supabase.from("posts").delete().eq("id", id);

      if (error) throw error;

      console.log("Post deleted", id); // Handle post-deletion logic here
      setShowMenu(false); // Hide the menu after selecting
    } catch (err) {
      console.error("Error deleting post:", err);
    }
  };

  const handleReport = () => {
    console.log("Report post", id); // Handle the report post functionality here
    setShowMenu(false); // Hide the menu after selecting
  };

  const confirmDelete = () => {
    handleDelete(); // Call the delete function
    setShowAlertDialog(false); // Close the alert dialog
  };

  const handleEdit = () => {
    setShowEditModal(true); // Show the edit modal
    setShowMenu(false); // Hide the menu after selecting
  };

  const handleSaveEdit = async (
    postId,
    newTitle,
    newDescription,
    newLocation,
    newEmail,
    newContact
  ) => {
    try {
      const { data, error } = await supabase
        .from("posts")
        .update({
          title: newTitle,
          description: newDescription,
          location: newLocation,
          contact: newContact,
          email: newEmail,
        })
        .eq("id", postId);

      if (error) throw error;

      console.log("Post updated successfully", data);
    } catch (err) {
      console.error("Error updating post:", err);
    }
  };

  // Define the valid admin pages
  const validAdminPages = ["/admindashboard"];

  return (
    <div className="card">
      <div className="card-header">
        <h3>{title}</h3>
        <div className="menu-container">
          <div className="menu-icon" onClick={handleMenuClick}>
            ●●●
          </div>
          {showMenu && (
            <div className="menu-dropdown">
              {isAdmin && validAdminPages.includes(locations.pathname) ? (
                <>
                  <div className="menu-container1" onClick={handleEdit}>
                    <div className="menu-option-edit" onClick={handleEdit}>
                      Edit Post
                    </div>
                    <div
                      className="menu-option-delete"
                      onClick={() => setShowAlertDialog(true)} // Show alert dialog on delete click
                    >
                      Delete Post
                    </div>
                  </div>
                </>
              ) : (
                <div className="menu-option-report" onClick={handleReport}>
                  Report Post
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <br />
      <p>
        {isExpanded ? description : `${description.substring(0, 50)}...`}
        <span className="see-more" onClick={toggleExpand}>
          {isExpanded ? "See less" : "See more"}
        </span>
      </p>
      <EditPostModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        postId={id}
        currentTitle={title}
        currentDescription={description}
        currentContact={contact}
        currentEmail={email}
        currentLocation={location}
        onSave={handleSaveEdit}
      />
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
      {showAlertDialog && (
        <AlertDialog
          message="Are you sure you want to delete this post?"
          paragraph="This action cannot be undone. This will permanently delete this post."
          onConfirm={confirmDelete}
          onCancel={() => setShowAlertDialog(false)} // Close the alert dialog
        />
      )}
    </div>
  );
}

export default VolunteerCard;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";
import PostCreationPanel from "../components/PostCreationPanel";
import VolunteerList from "../components/VolunteerList";

function AdminDashboard({ handleLogout }) {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleCreateClick = () => {
    setIsPanelOpen((prevState) => !prevState);
  };

  const handleAvatarClick = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const handleApprovalClick = () => {
    navigate("/donationapproval"); // Ensure the path matches the route defined in App.jsx
  };

  return (
    <>
      <Header
        onCreateClick={handleCreateClick}
        onAvatarClick={handleAvatarClick}
        onApprovalClick={handleApprovalClick}
      />
      <div className="landing-page">
        {isPanelOpen && (
          <PostCreationPanel
            isVisible={isPanelOpen}
            onClose={() => setIsPanelOpen(false)}
          />
        )}
        <div className="background-section"></div>
        <div className="content">
          <VolunteerList />
        </div>
      </div>
      {isDropdownOpen && (
        <div className="dropdown-menu">
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </>
  );
}

function Header({ onCreateClick, onAvatarClick, onApprovalClick }) {
  return (
    <header className="header">
      <div className="logo">DONOPH</div>
      <div className="profile-section">
        <button className="donation-approval" onClick={onApprovalClick}>
          Approval
        </button>
        <button className="create-button" onClick={onCreateClick}>
          Create
        </button>
        <div className="avatar" onClick={onAvatarClick}>
          <img src="https://placehold.co/40x40" alt="Profile" />
        </div>
      </div>
    </header>
  );
}

export default AdminDashboard;

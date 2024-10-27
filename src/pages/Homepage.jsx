import React, { useState } from "react";
import "./Homepage.css";
import VolunteerList from "../components/VolunteerList";
import TrackProgressModal from "../components/TrackProgressModal";
function LandingPage() {
  const [isPanelOpen, setIsPanelOpen] = useState(false); // State to control visibility of PostCreationPanel
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control visibility of Track Progress modal

  const handleCreateClick = () => {
    setIsPanelOpen((prevState) => !prevState); // Toggle the panel visibility
  };

  const handleTrackProgressClick = () => {
    setIsModalOpen(true); // Open Track Progress Modal
  };

  const handleModalClose = () => {
    setIsModalOpen(false); // Close Modal
  };

  function Header({ onCreateClick, onTrackProgressClick }) {
    return (
      <header className="header">
        <div className="logo">DONOPH</div>
        <nav className="nav-links">
          <a href="/landingpage">About Us</a>
          <a href="/landingpage">Contact Us</a>
          <button onClick={onTrackProgressClick}>Track Progress</button>
        </nav>
        <button className="nav-btn1">Donate</button>
      </header>
    );
  }

  return (
    <>
      <Header
        onCreateClick={handleCreateClick}
        onTrackProgressClick={handleTrackProgressClick}
      />
      <div className="landing-page">
        {isPanelOpen && (
          <PostCreationPanel
            isVisible={isPanelOpen}
            onClose={() => setIsPanelOpen(false)}
          />
        )}{" "}
        {/* Render PostCreationPanel when open */}
        <div className="background-section"></div>
        <div className="content">
          <VolunteerList /> {/* Render the list of posts dynamically */}
        </div>
      </div>
      {isModalOpen && <TrackProgressModal onClose={handleModalClose} />}{" "}
      {/* Track Progress Modal */}
    </>
  );
}

export default LandingPage;

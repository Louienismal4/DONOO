import React from "react";
import "./TrackProgressModal.css";

function TrackProgressModal({ onClose }) {
  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h2 className="modal-title">Enter ID</h2>
        <input
          type="text"
          placeholder="paste your donation code here"
          className="track-id-input"
        />
        <button className="enter-button">Enter</button>{" "}
        {/* Added Enter button */}
        <div className="progress-bar">
          <div className="progress-step active">
            <div className="circle"></div>
            <span>Processing</span>
          </div>
          <div className="progress-step">
            <div className="circle"></div>
            <span>Under Review</span>
          </div>
          <div className="progress-step">
            <div className="circle"></div>
            <span>Approved</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrackProgressModal;

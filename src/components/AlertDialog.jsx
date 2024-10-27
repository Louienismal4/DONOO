// AlertDialog.js
import React from "react";
import "./AlertDialog.css"; // Create a CSS file for styles

const AlertDialog = ({ message, paragraph, onConfirm, onCancel }) => {
  return (
    <div className="alert-dialog">
      <div className="alert-dialog-content">
        <h4>{message}</h4>
        <p className="alert-p">{paragraph}</p>
        <div className="alert-dialog-buttons">
          <button onClick={onCancel}>Cancel</button>
          <button onClick={onConfirm}>Continue</button>
        </div>
      </div>
    </div>
  );
};

export default AlertDialog;

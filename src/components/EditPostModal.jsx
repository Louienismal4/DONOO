// EditPostModal.jsx
import React, { useState } from "react";
import ReactModal from "react-modal";
import "./EditPostModal.css";

ReactModal.setAppElement("#root"); // Set the app element for accessibility

function EditPostModal({
  isOpen,
  onClose,
  postId,
  currentTitle,
  currentDescription,
  currentLocation,
  currentEmail,
  currentContact,
  onSave,
}) {
  const [editTitle, setEditTitle] = useState(currentTitle);
  const [editDescription, setEditDescription] = useState(currentDescription);
  const [editLocation, setEditLocation] = useState(currentLocation);
  const [editEmail, setEditEmail] = useState(currentEmail);
  const [editContact, setEditContact] = useState(currentContact);

  const handleSave = () => {
    onSave(
      postId,
      editTitle,
      editDescription,
      editLocation,
      editEmail,
      editContact
    );
    onClose(); // Close the modal after saving
  };

  const handleCancel = () => {
    onClose(); // Close the modal without saving
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={handleCancel}
      contentLabel="Edit Post"
      className="modal"
      overlayClassName="modal-overlay"
    >
      <h3>Edit Post</h3>
      <h4>Title</h4>
      <input
        type="text"
        value={editTitle}
        onChange={(e) => setEditTitle(e.target.value)}
        placeholder="Edit Title"
      />
      <h4>Description</h4>
      <textarea
        value={editDescription}
        onChange={(e) => setEditDescription(e.target.value)}
        placeholder="Description"
      />
      <h4>Location</h4>
      <textarea
        value={editLocation}
        onChange={(e) => setEditLocation(e.target.value)}
        placeholder="Edit Location"
      />
      <h4>Email</h4>
      <textarea
        value={editEmail}
        onChange={(e) => setEditEmail(e.target.value)}
        placeholder="Edit Email"
      />
      <h4>Contact Number</h4>
      <textarea
        value={editContact}
        onChange={(e) => setEditContact(e.target.value)}
        placeholder="Edit Contact Number"
      />
      <button onClick={handleSave}>Save</button>
      <button onClick={handleCancel}>Cancel</button>
    </ReactModal>
  );
}

export default EditPostModal;

import React, { useState, useEffect, lazy, Suspense } from 'react';
import './PostCreationPanel.css';
import { supabase } from '../supabaseClient';
import Uppy from '@uppy/core';
import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';

// Lazy load Uppy Dashboard
const Dashboard = lazy(() => import('@uppy/react/lib/Dashboard'));

const PostCreationPanel = ({ isVisible }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [fadeOut, setFadeOut] = useState(false);
  const [errors, setErrors] = useState({});
  const [imageUrl, setImageUrl] = useState('');

  const [uppyInstance, setUppyInstance] = useState(null);

  useEffect(() => {
    if (isVisible && !uppyInstance) {
      const uppy = new Uppy({
        restrictions: { maxNumberOfFiles: 1 },
        autoProceed: false,
      });

      setUppyInstance(uppy);
    }

    return () => {
      if (uppyInstance) {
        uppyInstance.destroy();
      }
    };
  }, [isVisible, uppyInstance]);

  const validateForm = () => {
    const newErrors = {};

    if (title.trim().length < 5) {
      newErrors.title = 'Title must be at least 5 characters long.';
    }
    if (description.trim().length < 10) {
      newErrors.description = 'Description must be at least 10 characters long.';
    }
    if (!location.trim()) {
      newErrors.location = 'Location is required.';
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    const contactPattern = /^\d{10}$/;
    if (!contactPattern.test(contact)) {
      newErrors.contact = 'Contact number must be 10 digits.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreateClick = () => {
    if (isVisible) {
      setFadeOut(true); // Set fadeOut to true
      setTimeout(() => {
        onClose(); // Close the panel after the animation duration
      }, 500); // Match this duration with your CSS fadeOut animation
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!validateForm()) {
      return;
    }
  
    try {
      const result = await uppyInstance.upload();
  
      if (result.failed.length > 0) {
        console.error('Upload failed:', result.failed);
        return; // Handle upload failure appropriately
      }
  
      const file = result.successful[0].data;
  
      // Sanitize the file name
      const sanitizedFileName = file.name.replace(/\s+/g, '_');
  
      // Upload the file to Supabase storage
      const { data, error: uploadError } = await supabase.storage
        .from('images')
        .upload(`images/${sanitizedFileName}`, file);
  
      if (uploadError) {
        console.error('Upload error:', uploadError);
        return;
      }
  
      // Get the public URL of the uploaded image
      const publicUrl = supabase.storage
        .from('images')
        .getPublicUrl(data.path)
        .data.publicUrl;
      setImageUrl(publicUrl);
  
      // Insert post data into Supabase
      const { data: postData, error: postError } = await supabase
        .from('posts')
        .insert([{ title, description, location, email, contact, image_url: publicUrl }]);
  
      if (postError) {
        console.error('Error inserting data:', postError);
      } else {
        console.log('Post created:', postData);
        // Reset form fields
        setTitle('');
        setDescription('');
        setLocation('');
        setEmail('');
        setContact('');
        setImageUrl('');
        setErrors({});
  
        // Clear Uppy Dashboard
        if (uppyInstance) {
          uppyInstance.getFiles().forEach((file) => {
            uppyInstance.removeFile(file.id); // Clear individual files
          });
        }
      }
    } catch (error) {
      console.error('Unexpected error:', error);
    }
  };
  

  if (!isVisible) {
    return null;
  }

  return (
    <div className={`post-creation-wrapper ${fadeOut ? 'fade-out' : ''}`}>
      <div className="post-panel">
        <div className="form">
          <input
            type="text"
            placeholder="Add Title"
            className="title-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {errors.title && <div className="error-message">{errors.title}</div>}

          <textarea
            placeholder="What's this all about"
            className="description-input"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {errors.description && <div className="error-message">{errors.description}</div>}

          {/* Uppy Dashboard */}
          <Suspense fallback={<div>Loading Uppy Dashboard...</div>}>
            {uppyInstance && <Dashboard uppy={uppyInstance} hideUploadButton hideCancelButton />}
          </Suspense>

          <div className="inputs">
            <div className="input-row">
              <img src="/public/map.png" alt="Location Icon" width={24} height={24} />
              <input
                type="text"
                placeholder="Add Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              {errors.location && <div className="error-message">{errors.location}</div>}
            </div>
            <div className="input-row">
              <img src="/public/letter.png" alt="Email Icon" width={24} height={24} />
              <input
                type="text"
                placeholder="Add Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <div className="error-message">{errors.email}</div>}
            </div>
            <div className="input-row">
              <img src="/public/phone.png" alt="Phone Icon" width={24} height={24} />
              <input
                type="text"
                placeholder="Add Contact no."
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
              {errors.contact && <div className="error-message">{errors.contact}</div>}
            </div>
          </div>
          <button className="post-button" onClick={handleSubmit}>POST</button>
        </div>
        {imageUrl && (
          <div className="image-container">
            <img src={imageUrl} alt="Uploaded" />
          </div>
        )}
      </div>
    </div>
  );
};

export default PostCreationPanel;
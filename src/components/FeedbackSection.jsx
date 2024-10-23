import React from "react";
import "./FeedbackSection.css";

const FeedbackSection = () => {
  const feedbackData = [
    { name: "Jane Doe", feedback: "asdasdasdasdasdas", imgSrc: "batamga.jpeg" },
    { name: "Mark", feedback: "asdasdasdasdasd", imgSrc: "mark.png" },
    { name: "Denise", feedback: "asdasdasdasdasdasda", imgSrc: "denise.png" }
  ];

  return (
    <section className="feedback-section">
      <h2>Feedback from Our Community</h2>
      <div className="feedback-cards">
        {feedbackData.map((item, index) => (
          <div key={index} className="feedback-card">
            <img className="vector" src="Vector.png" />
            <p className="feedback-text">“{item.feedback}”</p>
            <div className="user-info">
              <img src={item.imgSrc} alt={item.name} className="user-img" />
              <p>{item.name}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeedbackSection;

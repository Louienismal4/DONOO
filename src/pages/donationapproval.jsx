import React, { useState } from "react";
import "./donationapproval.css";

const donors = [
  {
    name: "Armored Clavio",
    details: "Donating $100 for relief efforts. Email: armored@example.com",
  },
  {
    name: "Mark Joseph",
    details: "Donating $50 for education funds. Email: mark@example.com",
  },
  {
    name: "Sarah Tikbalang",
    details: "Donating $150 for health programs. Email: sarah@example.com",
  },
  {
    name: "Si quak quak",
    details:
      "Donating $200 for environmental projects. Email: siquak@example.com",
  },
];

const DonationApproval = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="container-approval">
      <header className="header">
        <h1>DONOPH</h1>
        <div className="profile-icon"></div>
      </header>
      <div className="donor-list">
        {donors.map((donor, index) => (
          <div
            key={index}
            className={`donor-item ${
              expandedIndex === index ? "expanded" : ""
            }`}
          >
            <div className="donor-info">
              <span>{donor.name}</span>
              <button
                className="view-button"
                onClick={() => toggleExpand(index)}
              >
                {expandedIndex === index ? "Close" : "View"}
              </button>
            </div>
            {expandedIndex === index && (
              <div className="donor-details">
                <p>{donor.details}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonationApproval;

import React, { useState } from "react";
import "./Faq.css";

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "How can I get started?",
      answer: "You can start by creating an account and browsing our services.",
    },
    {
      question: "How can I donate?",
      answer:
        "You can donate by selecting a program and choosing a payment method.",
    },
    {
      question: "What are the benefits?",
      answer:
        "Benefits include tax deductions and making a difference in the community.",
    },
    {
      question: "What are the donating programs?",
      answer:
        "We offer various programs, such as education, healthcare, and food security.",
    },
  ];

  return (
    <section className="faq-section">
      <h2>FAQs</h2>
      <div className="faq-container">
        {faqs.map((item, index) => (
          <div
            key={index}
            className={`faq-item ${activeIndex === index ? "active" : ""}`}
          >
            <div className="faq-question" onClick={() => toggleFAQ(index)}>
              <p>{item.question}</p>
              <span>{activeIndex === index ? "▲" : "▼"}</span>
            </div>
            {activeIndex === index && (
              <div className="faq-answer">{item.answer}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;

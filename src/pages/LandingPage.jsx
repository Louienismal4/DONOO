import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";
import { motion } from "framer-motion";
import FeedbackSection from "../components/FeedbackSection";
import FAQSection from "../components/Faq";

const headerVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeInOut" },
  },
};

const navItemVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeInOut" },
  },
};

const navListVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};

const revealVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeInOut" },
  },
};

const textVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1, ease: "easeInOut" } },
};

const header1Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 1, ease: "easeInOut" } },
};

const header2Variants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0, transition: { duration: 1, ease: "easeInOut" } },
};

const header3Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 1, ease: "easeInOut" } },
};

const stayconnectedVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeInOut" } },
};

function User() {
  return (
    <>
      <div className="App">
        <header className="App-header">
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={headerVariants}
          >
            DONOPH
          </motion.h1>
          <nav>
            <motion.ul
              className="nav-list"
              initial="hidden"
              animate="visible"
              variants={navListVariants}
            >
              <motion.li variants={navItemVariants}>
                <Link to="/homepage">Homepage</Link>
              </motion.li>
              <motion.li variants={navItemVariants}>
                <a href="#about-us-section">About Us</a>
              </motion.li>
              <motion.li variants={navItemVariants}>
                <a href="#contact-us-section">Contact</a>
              </motion.li>
              <motion.li variants={navItemVariants}>
                <button className="nav-btn">Donate</button>
              </motion.li>
            </motion.ul>
          </nav>
        </header>

        <motion.section
          className="image-section1"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.5 }}
          variants={revealVariants}
        >
          <img src="Rectangle 2.png" alt="Description of image" />
          <motion.p variants={textVariants}>Donate and Inspire others</motion.p>
        </motion.section>

        <motion.section
          id="about-us-section"
          className="image-section2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.5 }}
          variants={revealVariants}
        >
          <img src="Rectangle.jpeg" alt="Description of image" />
          <motion.p variants={header1Variants}>
            DONO is a nonprofit organization here in the Philippines where
            everyone can donate food, clothes and other supplies that can be use
            for those who in need.
          </motion.p>
        </motion.section>

        <motion.section
          className="image-section3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.5 }}
          variants={revealVariants}
        >
          <motion.h1 variants={textVariants}>OUR PROGRAMS</motion.h1>
        </motion.section>

        <motion.section
          className="image-section4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.5 }}
          variants={revealVariants}
        >
          <img src="batamga.jpeg" alt="Description of image" />
          <div className="image-section4-1">
            <motion.h1 variants={header2Variants}>Feeding Program</motion.h1>
            <motion.p variants={header2Variants}>
              DONO is a nonprofit organization here in the Philippines where
              everyone can donate food, clothes and other supplies that can be
              use for those who in need.
            </motion.p>
          </div>
        </motion.section>

        <motion.section
          className="image-section5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.5 }}
          variants={revealVariants}
        >
          <img src="donet.png" alt="Description of image" />
          <div className="image-section5-1">
            <motion.h1 variants={header3Variants}>Donations</motion.h1>
            <motion.p variants={header3Variants}>
              DONO is a nonprofit organization here in the Philippines where
              everyone can donate food, clothes and other supplies that can be
              use for those who in need.
            </motion.p>
          </div>
        </motion.section>
        <FeedbackSection />
        <FAQSection />
        <motion.section
          className="image-section6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.5 }}
          variants={revealVariants}
        >
          <img src="behindthesuffer.png" alt="Description of image" />
          <div className="image-section6-1">
            <motion.h1 variants={stayconnectedVariants}>
              Stay Connected
            </motion.h1>
            <ul className="nav-list">
              <li>
                <img
                  src="Facebook.png"
                  alt="Facebook"
                  className="social-icon"
                />
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Facebook
                </a>
              </li>
              <li>
                <img
                  src="Instagram.png"
                  alt="Instagram"
                  className="social-icon"
                />
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
              </li>
              <li>
                <img src="TwitterX.png" alt="Twitter" className="social-icon" />
                <a
                  href="https://www.twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Twitter
                </a>
              </li>
            </ul>
          </div>
        </motion.section>

        <motion.section
          className="image-section7"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.5 }}
          variants={revealVariants}
        >
          <motion.h1 variants={textVariants}>Start Donating Now!</motion.h1>
          <button class="d-btn">
            <span class="dbtn text">Donate</span>
            <span class="dbt svg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="20"
                viewBox="0 0 38 15"
                fill="none"
              >
                <path
                  fill="white"
                  d="M10 7.519l-.939-.344h0l.939.344zm14.386-1.205l-.981-.192.981.192zm1.276 5.509l.537.843.148-.094.107-.139-.792-.611zm4.819-4.304l-.385-.923h0l.385.923zm7.227.707a1 1 0 0 0 0-1.414L31.343.448a1 1 0 0 0-1.414 0 1 1 0 0 0 0 1.414l5.657 5.657-5.657 5.657a1 1 0 0 0 1.414 1.414l6.364-6.364zM1 7.519l.554.833.029-.019.094-.061.361-.23 1.277-.77c1.054-.609 2.397-1.32 3.629-1.787.617-.234 1.17-.392 1.623-.455.477-.066.707-.008.788.034.025.013.031.021.039.034a.56.56 0 0 1 .058.235c.029.327-.047.906-.39 1.842l1.878.689c.383-1.044.571-1.949.505-2.705-.072-.815-.45-1.493-1.16-1.865-.627-.329-1.358-.332-1.993-.244-.659.092-1.367.305-2.056.566-1.381.523-2.833 1.297-3.921 1.925l-1.341.808-.385.245-.104.068-.028.018c-.011.007-.011.007.543.84zm8.061-.344c-.198.54-.328 1.038-.36 1.484-.032.441.024.94.325 1.364.319.45.786.64 1.21.697.403.054.824-.001 1.21-.09.775-.179 1.694-.566 2.633-1.014l3.023-1.554c2.115-1.122 4.107-2.168 5.476-2.524.329-.086.573-.117.742-.115s.195.038.161.014c-.15-.105.085-.139-.076.685l1.963.384c.192-.98.152-2.083-.74-2.707-.405-.283-.868-.37-1.28-.376s-.849.069-1.274.179c-1.65.43-3.888 1.621-5.909 2.693l-2.948 1.517c-.92.439-1.673.743-2.221.87-.276.064-.429.065-.492.057-.043-.006.066.003.155.127.07.099.024.131.038-.063.014-.187.078-.49.243-.94l-1.878-.689zm14.343-1.053c-.361 1.844-.474 3.185-.413 4.161.059.95.294 1.72.811 2.215.567.544 1.242.546 1.664.459a2.34 2.34 0 0 0 .502-.167l.15-.076.049-.028.018-.011c.013-.008.013-.008-.524-.852l-.536-.844.019-.012c-.038.018-.064.027-.084.032-.037.008.053-.013.125.056.021.02-.151-.135-.198-.895-.046-.734.034-1.887.38-3.652l-1.963-.384zm2.257 5.701l.791.611.024-.031.08-.101.311-.377 1.093-1.213c.922-.954 2.005-1.894 2.904-2.27l-.771-1.846c-1.31.547-2.637 1.758-3.572 2.725l-1.184 1.314-.341.414-.093.117-.025.032c-.01.013-.01.013.781.624zm5.204-3.381c.989-.413 1.791-.42 2.697-.307.871.108 2.083.385 3.437.385v-2c-1.197 0-2.041-.226-3.19-.369-1.114-.139-2.297-.146-3.715.447l.771 1.846z"
                ></path>
              </svg>
            </span>
          </button>
        </motion.section>

        <footer id="contact-us-section" className="footer">
          <div className="footer-content">
            <div className="footer-section">
              <motion.h2 variants={textVariants}>DONOPH</motion.h2>
            </div>
            <div className="footer-section">
              <motion.h3 variants={textVariants}>Social Media</motion.h3>
              <motion.p variants={textVariants}>DonoPH</motion.p>
              <motion.p variants={textVariants}>@DonoPH</motion.p>
              <motion.p variants={textVariants}>DonoPH</motion.p>
            </div>
            <div className="footer-section">
              <motion.h3 variants={textVariants}>Contacts</motion.h3>
              <motion.p variants={textVariants}>
                123 Maple Street, Springfield, XY 54321
              </motion.p>
              <motion.p variants={textVariants}>
                Email: donoph@gmail.com
              </motion.p>
              <motion.p variants={textVariants}>Contact no: 094736283</motion.p>
            </div>
          </div>
          <div className="footer-bottom">
            <motion.p variants={textVariants}>© 2024 DONO PHILIPPINES</motion.p>
          </div>
        </footer>
      </div>
    </>
  );
}

export default User;

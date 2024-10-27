import React, { useState } from "react";
import { supabase } from "../supabaseClient"; // Import the Supabase client
import "./login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Supabase authentication with email and password
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Error logging in:", error.message);
      } else {
        console.log("Logged in successfully", data);
        window.location.href = "/admindashboard"; // Redirect after successful login
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  return (
    <div className="container">
      <div className="left-section">
        <img src="image.png" alt="Background" className="background-image" />
        <div className="overlay">DONOPH</div>
      </div>
      <div className="right-section">
        <div className="login-box">
          <h2>LOGIN</h2>
          <br />
          <p>Login as administrator</p>
          <br />
          <br />
          <br />
          <form onSubmit={handleSubmit}>
            <div className="wave-group">
              <input
                required
                type="email"
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <span className="bar"></span>
              <label className="label">
                <span className="label-char" style={{ "--index": 0 }}>
                  E
                </span>
                <span className="label-char" style={{ "--index": 1 }}>
                  m
                </span>
                <span className="label-char" style={{ "--index": 2 }}>
                  a
                </span>
                <span className="label-char" style={{ "--index": 3 }}>
                  i
                </span>
                <span className="label-char" style={{ "--index": 4 }}>
                  l
                </span>
              </label>
            </div>
            <div className="wave-group">
              <input
                required
                type="password"
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="bar"></span>
              <label className="label">
                <span className="label-char" style={{ "--index": 0 }}>
                  P
                </span>
                <span className="label-char" style={{ "--index": 1 }}>
                  a
                </span>
                <span className="label-char" style={{ "--index": 2 }}>
                  s
                </span>
                <span className="label-char" style={{ "--index": 3 }}>
                  s
                </span>
                <span className="label-char" style={{ "--index": 4 }}>
                  w
                </span>
                <span className="label-char" style={{ "--index": 5 }}>
                  o
                </span>
                <span className="label-char" style={{ "--index": 6 }}>
                  r
                </span>
                <span className="label-char" style={{ "--index": 7 }}>
                  d
                </span>
              </label>
            </div>
            <div className="remember-me">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label>Remember Me</label>
            </div>
            <br />
            <br />
            <button type="submit">Login</button>
            <br />
            <br />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;

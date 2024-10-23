import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/login";
import AdminDashboard from "./pages/AdminDashboard";
import LandingPage from "./pages/LandingPage";
import Homepage from "./pages/homepage";
import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import ProtectedRoute from "./protectedRoute";
import DonationApproval from "./pages/donationapproval";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Supabase onAuthStateChange to track user login state
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null); // Set user if session exists, otherwise null
        setLoading(false); // Stop loading after authentication check
      }
    );

    return () => {
      authListener.subscription.unsubscribe(); // Cleanup listener
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut(); // Supabase sign out
    setUser(null); // Clear the user state after logout
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />{" "}
        {/* Redirect root to Homepage */}
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/admindashboard"
          element={
            <ProtectedRoute user={user}>
              <AdminDashboard handleLogout={handleLogout} />
            </ProtectedRoute>
          }
        />
        <Route path="/LandingPage" element={<LandingPage />} />
        <Route
          path="/donationapproval"
          element={
            <ProtectedRoute user={user}>
              <DonationApproval />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

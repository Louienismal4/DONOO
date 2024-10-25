import React, { useState, useEffect } from "react";
import VolunteerCard from "./VolunteerCard";
import { supabase } from "../supabaseClient";
import "./VolunteerList.css";

const VolunteerList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data, error } = await supabase.from("posts").select("*");

        if (error) {
          throw error;
        }

        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="volunteer-list">
      {posts.map((post) => (
        <VolunteerCard
          key={post.id}
          id={post.id} // Pass post id
          title={post.title}
          description={post.description}
          imageUrl={post.image_url || "https://placehold.co/100x100"}
          likes={post.likes || 0}
          location={post.location}
          email={post.email}
          contact={post.contact}
        />
      ))}
    </div>
  );
};

export default VolunteerList;

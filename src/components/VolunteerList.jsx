import React, { useState, useEffect } from 'react';
import VolunteerCard from './VolunteerCard';
import { supabase } from '../supabaseClient';
import './VolunteerList.css';

const VolunteerList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        console.log('Fetching posts...');
        const { data, error } = await supabase
          .from('posts')
          .select('*');

        if (error) {
          throw error;
        }

        console.log('Fetched posts:', data);
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
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
      {posts.map((post) => {
        console.log('Rendering post:', post);
        return (
          <VolunteerCard
          key={post.id}
          title={post.title}
          description={post.description}
          imageUrl={post.image_url || "https://placehold.co/100x100"}
          likes={post.likes || 0}
          location={post.location}      // Pass location data
          email={post.email}            // Pass email data
          contact={post.contact}        // Pass contact data
        />
        );
      })}
    </div>
  );
};

export default VolunteerList;
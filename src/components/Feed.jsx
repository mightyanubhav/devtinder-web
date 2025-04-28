import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFeedUsers } from '../utils/feedSlice';
import UserCard from './UserCard';
import { BASE_URL } from '../utils/constants';
import axios from 'axios';


const Feed = () => {
  const dispatch = useDispatch();
  const { users, loading } = useSelector(state => state.feed);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    dispatch(fetchFeedUsers());
  }, [dispatch]);

  const handleLike = async () => {
    const likedUser = users[currentIndex];
    try {
      await axios.post(`${BASE_URL}request/send/interested/${likedUser._id}`, {}, {
        withCredentials: true, // important if using cookies for auth
      });
      console.log("Liked:", likedUser);
      setCurrentIndex(prev => prev + 1);
    } catch (error) {
      console.error("Failed to send like:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Failed to like user.");
    }
  };
  

  const handleIgnore = async () => {
    const ignoredUser = users[currentIndex];
    try {
      await axios.post(`${BASE_URL}request/send/ignored/${ignoredUser._id}`, {}, {
        withCredentials: true,
      });
      console.log("Ignored:", ignoredUser);
      setCurrentIndex(prev => prev + 1);
    } catch (error) {
      console.error("Failed to send ignore:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Failed to ignore user.");
    }
  };
  
  
  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (currentIndex >= users.length) {
    return <div className="flex justify-center items-center h-screen text-2xl font-bold">No more users 🥲</div>;
  }

  const currentUser = users[currentIndex];

  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <UserCard
        image={currentUser.profileImage}
        firstName={currentUser.firstName}
        lastName={currentUser.lastName}
        age={currentUser.age}
        email={currentUser.email}
        onLike={handleLike}
        onIgnore={handleIgnore}
      />
    </div>
  );
};

export default Feed;

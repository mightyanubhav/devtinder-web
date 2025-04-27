import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFeedUsers } from '../utils/feedSlice';
import UserCard from './UserCard';

const Feed = () => {
  const dispatch = useDispatch();
  const { users, loading } = useSelector(state => state.feed);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    dispatch(fetchFeedUsers());
  }, [dispatch]);

  const handleLike = () => {
    console.log("Liked:", users[currentIndex]);
    setCurrentIndex(prev => prev + 1);
  };

  const handleIgnore = () => {
    console.log("Ignored:", users[currentIndex]);
    setCurrentIndex(prev => prev + 1);
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

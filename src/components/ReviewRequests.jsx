import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import UserCard from './UserCard';

const ReviewRequests = () => {
  const [requests, setRequests] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get(`${BASE_URL}user/requests`, {
          withCredentials: true,
        });
        setRequests(response.data); // directly response.data, not .requests
      } catch (error) {
        console.error('Failed to fetch requests:', error.response?.data || error.message);
        alert(error.response?.data?.message || "Failed to load requests.");
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const handleReview = async (status) => {
    const requestUser = requests[currentIndex];
    try {
      await axios.post(`${BASE_URL}request/review/${status}/${requestUser._id}`, {}, {
        withCredentials: true,
      });
      console.log(`User ${status}:`, requestUser);
      setCurrentIndex(prev => prev + 1);
    } catch (error) {
      console.error(`Failed to ${status}:`, error.response?.data || error.message);
      alert(error.response?.data?.message || `Failed to ${status} user.`);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (currentIndex >= requests.length) {
    return <div className="flex justify-center items-center h-screen text-2xl font-bold">No more requests 🥲</div>;
  }

  const currentRequest = requests[currentIndex];

  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <UserCard
        image={currentRequest.sender.profileImage}
        firstName={currentRequest.sender.firstName}
        lastName={currentRequest.sender.lastName}
        age={currentRequest.sender.age}
        email={currentRequest.sender.emailId}
        onLike={() => handleReview('accepted')}
        onIgnore={() => handleReview('rejected')}
      />
    </div>
  );
};

export default ReviewRequests;

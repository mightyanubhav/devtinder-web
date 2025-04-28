import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import UserCard from './UserCard';

const Connections = () => {
  const [connections, setConnections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const response = await axios.get(`${BASE_URL}user/connections`, {
          withCredentials: true,
        });
        setConnections(response.data.connections);
      } catch (error) {
        console.error('Failed to fetch connections:', error.response?.data || error.message);
        alert(error.response?.data?.message || "Failed to load connections.");
      } finally {
        setLoading(false);
      }
    };

    fetchConnections();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (connections.length === 0) {
    return <div className="flex justify-center items-center h-screen text-2xl font-bold">No connections yet 🥲</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {connections.map((user) => (
        <UserCard
          key={user._id}
          image={user.profileImage}
          firstName={user.firstName}
          lastName={user.lastName}
          age={user.age}
          email={user.emailId}
          onLike={null} // No like/ignore buttons needed here
          onIgnore={null}
        />
      ))}
    </div>
  );
};

export default Connections;

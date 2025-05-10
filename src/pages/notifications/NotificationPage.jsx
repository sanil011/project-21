import React, { useState, useEffect } from "react";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import NotificationCard from "../account/components/notifications-home/NotificationCard";
import api from "../../services/api";

const NotificationPage = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      const fetchNotifications = async () => {
        try {
          const response = await api.get("/gamma/lucky9/getNotification");
          const data = response.data;
    
          // Convert and sort by createdDate
          const sortedData = data
            .map((item) => {
              const [year, month, day, hour, minute, second, ms] = item.createdDate;
              const date = new Date(year, month - 1, day, hour, minute, second, ms / 1000000); // convert nanoseconds to ms
    
              return {
                id: item.id,
                title: "NOTIFICATION",
                timestamp: date.toLocaleString(),
                rawDate: date, // for sorting
                message: item.message,
              };
            })
            .sort((a, b) => b.rawDate - a.rawDate); // sort descending
    
          setNotifications(sortedData);
        } catch (error) {
          console.error("Fetch error:", error);
        } finally {
          setLoading(false);
        }
      };
    
      fetchNotifications();
    }, []);
    
  
  
  const handleDelete = (id) => {
    setNotifications((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="bg-[#22275b] min-h-screen pb-4">
      {/* Header */}
      <div className="transaction-header flex items-center justify-between px-4 py-3">
        <button onClick={() => navigate(-1)}>
          <ChevronLeft className="text-white w-5 h-5" />
        </button>
        <div className="flex-1 text-center text-white font-medium text-b">
          Notification
        </div>
        <div className="w-5 h-5" /> {/* For layout spacing */}
      </div>

      {/* Notification List */}
      <div className="mt-4 px-1">
        {loading ? (
          <div className="text-white text-center">Loading...</div>
        ) : notifications.length === 0 ? (
          <div className="text-white text-center">No notifications found</div>
        ) : (
          notifications.map((note) => (
            <NotificationCard
              key={note.id}
              title={note.title}
              timestamp={note.timestamp}
              message={note.message}
              onDelete={() => handleDelete(note.id)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationPage;

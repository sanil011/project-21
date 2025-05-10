import React from "react";
import { Email, DeleteOutline } from "@mui/icons-material";

const NotificationCard = ({ title, timestamp, message, onDelete }) => {
  return (
    <div className="bg-[#2b3270] text-white rounded-lg p-3 mb-3 mx-3 shadow-md relative">
      <div className="flex items-center gap-2 font-semibold text-sm">
        <Email sx={{ fontSize: 16 }} />
        <span>{title}</span>
      </div>
      <p className="text-xs text-gray-300 mt-1">{timestamp}</p>
      <p className="text-sm mt-2">{message}</p>
      <button
        className="absolute top-3 right-3 text-white"
        onClick={onDelete}
      >
        <DeleteOutline sx={{ fontSize: 20 }} />
      </button>
    </div>
  );
};

export default NotificationCard;

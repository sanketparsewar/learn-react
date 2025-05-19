import React from "react";
import { useParams } from "react-router-dom";

function User() {
  const { userid } = useParams();
  return (
    <div className="flex items-center justify-center h-50 bg-gray-100">
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-800">
          User: {userid}{" "}
        </h1>
        <p className="mt-2 text-gray-600">
          This is a sample user component styled with Tailwind CSS.
        </p>
      </div>
    </div>
  );
}

export default User;

import React, { useState } from "react";

const EditUserForm = ({ user, onSave, onCancel }) => {
  const [editUserData, setEditUserData] = useState({
    first_name: user.first_name || "",
    last_name: user.last_name || "",
    email: user.email || "",
  });

  const handleInputChange = (e) => {
    setEditUserData({ ...editUserData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!editUserData.first_name || !editUserData.last_name || !editUserData.email) {
      alert("All fields are required!");
      return;
    }
    onSave(user.id, editUserData);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4">Edit User</h2>
        <label className="block text-sm font-medium">First Name</label>
        <input
          type="text"
          name="first_name"
          value={editUserData.first_name}
          onChange={handleInputChange}
          className="border px-2 py-1 w-full mb-2"
          autoFocus
        />

        <label className="block text-sm font-medium">Last Name</label>
        <input
          type="text"
          name="last_name"
          value={editUserData.last_name}
          onChange={handleInputChange}
          className="border px-2 py-1 w-full mb-2"
        />

        <label className="block text-sm font-medium">Email</label>
        <input
          type="email"
          name="email"
          value={editUserData.email}
          onChange={handleInputChange}
          className="border px-2 py-1 w-full mb-4"
        />

        <div className="flex justify-end space-x-2">
          <button className="bg-green-500 text-white px-3 py-1 rounded cursor-pointer" onClick={handleSubmit}>
            Update
          </button>
          <button className="bg-gray-400 text-white px-3 py-1 rounded cursor-pointer" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditUserForm;

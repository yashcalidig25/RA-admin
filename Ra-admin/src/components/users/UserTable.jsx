"use client";

import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

export default function UserTable({ users, onEdit, onDelete }) {
  if (users.length === 0) {
    return (
      <div className="card p-12 text-center text-gray-500">
        No users found. Try adjusting your search or filters.
      </div>
    );
  }

  return (
    <div className="table-container">
      <table className="table">
        <thead className="table-header">
          <tr>
            <th className="table-header-cell">Name</th>
            <th className="table-header-cell">Email</th>
            <th className="table-header-cell">Mobile</th>
            <th className="table-header-cell">Status</th>
            <th className="table-header-cell">Type</th>
            <th className="table-header-cell">KYC Status</th>
            <th className="table-header-cell">Actions</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {users.map((user) => (
            <tr key={user._id} className="table-row">
              <td className="table-cell">
                <div className="flex items-center">
                  <img
                    src={
                      user.profileImage || "/placeholder.svg?height=40&width=40"
                    }
                    alt={user.name}
                    className="w-10 h-10 rounded-full mr-3 object-cover"
                  />
                  <span className="font-medium text-gray-900">{user.name}</span>
                </div>
              </td>
              <td className="table-cell">{user.email}</td>
              <td className="table-cell">{user.mobileNumber || "N/A"}</td>
              <td className="table-cell">
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    user.status === "ACTIVE"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {user.status}
                </span>
              </td>
              <td className="table-cell">
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    user.userType === "ADMIN"
                      ? "bg-purple-100 text-purple-800"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {user.userType}
                </span>
              </td>
              <td className="table-cell">
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    user.kycStatus === "VERIFIED"
                      ? "bg-green-100 text-green-800"
                      : user.kycStatus === "PENDING"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {user.kycStatus}
                </span>
              </td>
              <td className="table-cell">
                <div className="flex space-x-2">
                  <button
                    onClick={() => onEdit(user)}
                    className="p-1 rounded-full hover:bg-gray-100"
                  >
                    <PencilIcon className="w-5 h-5 text-blue-600" />
                  </button>
                  <button
                    onClick={() => onDelete(user._id)}
                    className="p-1 rounded-full hover:bg-gray-100"
                  >
                    <TrashIcon className="w-5 h-5 text-red-600" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

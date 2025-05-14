"use client";

import { useState, useEffect } from "react";
import { PlusIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import UserForm from "./UserForm";
import UserTable from "./UserTable";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  // Simulate fetching users
  useEffect(() => {
    // In a real app, this would be an API call
    setTimeout(() => {
      setUsers([
        {
          _id: "1",
          name: "John Doe",
          email: "john@example.com",
          mobileNumber: "1234567890",
          status: "ACTIVE",
          userType: "USER",
          address: "123 Main St, City",
          profileImage: "/placeholder.svg?height=50&width=50",
          kycStatus: "VERIFIED",
          authType: "EMAIL",
          likedItems: [],
        },
        {
          _id: "2",
          name: "Jane Smith",
          email: "jane@example.com",
          mobileNumber: "9876543210",
          status: "ACTIVE",
          userType: "ADMIN",
          address: "456 Oak St, Town",
          profileImage: "/placeholder.svg?height=50&width=50",
          kycStatus: "VERIFIED",
          authType: "GOOGLE",
          likedItems: [],
        },
        {
          _id: "3",
          name: "Bob Johnson",
          email: "bob@example.com",
          mobileNumber: "5551234567",
          status: "INACTIVE",
          userType: "USER",
          address: "789 Pine St, Village",
          profileImage: "/placeholder.svg?height=50&width=50",
          kycStatus: "PENDING",
          authType: "EMAIL",
          likedItems: [],
        },
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleAddUser = () => {
    setEditingUser(null);
    setShowForm(true);
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setShowForm(true);
  };

  const handleSaveUser = (userData) => {
    if (editingUser) {
      // Update existing user
      setUsers(
        users.map((user) =>
          user._id === editingUser._id ? { ...user, ...userData } : user
        )
      );
    } else {
      // Add new user
      setUsers([
        ...users,
        {
          _id: Date.now().toString(),
          ...userData,
          likedItems: [],
        },
      ]);
    }
    setShowForm(false);
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((user) => user._id !== userId));
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "ALL" || user.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Users Management</h1>
        <button
          className="btn btn-primary flex items-center"
          onClick={handleAddUser}
        >
          <PlusIcon className="w-5 h-5 mr-1" />
          Add User
        </button>
      </div>

      <div className="card mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="input pl-10"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="w-full md:w-48">
            <select
              className="select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="ALL">All Status</option>
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="card p-12 flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <UserTable
          users={filteredUsers}
          onEdit={handleEditUser}
          onDelete={handleDeleteUser}
        />
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <UserForm
              user={editingUser}
              onSave={handleSaveUser}
              onCancel={() => setShowForm(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

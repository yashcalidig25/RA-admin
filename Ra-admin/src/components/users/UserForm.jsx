"use client";

import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function UserForm({ user, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    mobileNumber: user?.mobileNumber || "",
    status: user?.status || "ACTIVE",
    userType: user?.userType || "USER",
    address: user?.address || "",
    kycStatus: user?.kycStatus || "NOT SUBMITTED",
    authType: user?.authType || "EMAIL",
    password: "",
    profileImage: user?.profileImage || "",
    aadhaarCardNumber: user?.aadhaarCardNumber || "",
    aadhaarCardImage: user?.aadhaarCardImage || "",
    panCardNumber: user?.panCardNumber || "",
    panCardImage: user?.panCardImage || "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear error when field is edited
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (formData.mobileNumber && !/^\d{10}$/.test(formData.mobileNumber)) {
      newErrors.mobileNumber = "Mobile number must be 10 digits";
    }

    if (!user && formData.authType === "EMAIL" && !formData.password) {
      newErrors.password = "Password is required for email authentication";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      onSave(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">{user ? "Edit User" : "Add User"}</h2>
        <button
          type="button"
          onClick={onCancel}
          className="p-1 rounded-full hover:bg-gray-100"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`input ${errors.name ? "border-red-500" : ""}`}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`input ${errors.email ? "border-red-500" : ""}`}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Mobile Number
          </label>
          <input
            type="text"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            className={`input ${errors.mobileNumber ? "border-red-500" : ""}`}
          />
          {errors.mobileNumber && (
            <p className="mt-1 text-sm text-red-500">{errors.mobileNumber}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="select"
          >
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            User Type
          </label>
          <select
            name="userType"
            value={formData.userType}
            onChange={handleChange}
            className="select"
          >
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Authentication Type
          </label>
          <select
            name="authType"
            value={formData.authType}
            onChange={handleChange}
            className="select"
          >
            <option value="EMAIL">Email</option>
            <option value="GOOGLE">Google</option>
          </select>
        </div>

        {(!user || (user && formData.authType === "EMAIL")) && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password{" "}
              {!user && formData.authType === "EMAIL" && (
                <span className="text-red-500">*</span>
              )}
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`input ${errors.password ? "border-red-500" : ""}`}
              placeholder={user ? "Leave blank to keep current password" : ""}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">{errors.password}</p>
            )}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            KYC Status
          </label>
          <select
            name="kycStatus"
            value={formData.kycStatus}
            onChange={handleChange}
            className="select"
          >
            <option value="NOT SUBMITTED">Not Submitted</option>
            <option value="PENDING">Pending</option>
            <option value="VERIFIED">Verified</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Address
          </label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            rows="3"
            className="input"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Profile Image URL
          </label>
          <input
            type="text"
            name="profileImage"
            value={formData.profileImage}
            onChange={handleChange}
            className="input"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Aadhaar Card Number
          </label>
          <input
            type="text"
            name="aadhaarCardNumber"
            value={formData.aadhaarCardNumber}
            onChange={handleChange}
            className="input"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Aadhaar Card Image URL
          </label>
          <input
            type="text"
            name="aadhaarCardImage"
            value={formData.aadhaarCardImage}
            onChange={handleChange}
            className="input"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            PAN Card Number
          </label>
          <input
            type="text"
            name="panCardNumber"
            value={formData.panCardNumber}
            onChange={handleChange}
            className="input"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            PAN Card Image URL
          </label>
          <input
            type="text"
            name="panCardImage"
            value={formData.panCardImage}
            onChange={handleChange}
            className="input"
          />
        </div>
      </div>

      <div className="mt-8 flex justify-end space-x-3">
        <button type="button" onClick={onCancel} className="btn btn-secondary">
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          {user ? "Update User" : "Add User"}
        </button>
      </div>
    </form>
  );
}

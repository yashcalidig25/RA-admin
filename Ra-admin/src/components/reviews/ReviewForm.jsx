"use client";

import { useState, useEffect } from "react";
import { XMarkIcon, StarIcon } from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";

export default function ReviewForm({ review, onSave, onCancel }) {
  const [users, setUsers] = useState([]);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [formData, setFormData] = useState({
    userId: review?.userId || "",
    itemId: review?.itemId || "",
    rating: review?.rating || 5,
    comment: review?.comment || "",
  });

  const [errors, setErrors] = useState({});

  // Simulate fetching users and items for dropdowns
  useEffect(() => {
    // In a real app, this would be an API call
    setTimeout(() => {
      setUsers([
        { _id: "1", name: "John Doe" },
        { _id: "2", name: "Jane Smith" },
        { _id: "3", name: "Bob Johnson" },
      ]);

      setItems([
        { _id: "1", title: 'MacBook Pro 16"' },
        { _id: "2", title: "Mountain Bike" },
        { _id: "3", title: "DSLR Camera" },
      ]);

      setIsLoading(false);
    }, 500);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear error when field is edited
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const handleRatingChange = (newRating) => {
    setFormData({ ...formData, rating: newRating });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.userId) {
      newErrors.userId = "User is required";
    }

    if (!formData.itemId) {
      newErrors.itemId = "Item is required";
    }

    if (!formData.rating || formData.rating < 1 || formData.rating > 5) {
      newErrors.rating = "Rating must be between 1 and 5";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      onSave({
        ...formData,
        rating: Number(formData.rating),
      });
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">
          {review ? "Edit Review" : "Add Review"}
        </h2>
        <button
          type="button"
          onClick={onCancel}
          className="p-1 rounded-full hover:bg-gray-100"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            User <span className="text-red-500">*</span>
          </label>
          <select
            name="userId"
            value={formData.userId}
            onChange={handleChange}
            className={`select ${errors.userId ? "border-red-500" : ""}`}
          >
            <option value="">Select User</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.name}
              </option>
            ))}
          </select>
          {errors.userId && (
            <p className="mt-1 text-sm text-red-500">{errors.userId}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Item <span className="text-red-500">*</span>
          </label>
          <select
            name="itemId"
            value={formData.itemId}
            onChange={handleChange}
            className={`select ${errors.itemId ? "border-red-500" : ""}`}
          >
            <option value="">Select Item</option>
            {items.map((item) => (
              <option key={item._id} value={item._id}>
                {item.title}
              </option>
            ))}
          </select>
          {errors.itemId && (
            <p className="mt-1 text-sm text-red-500">{errors.itemId}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Rating <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => handleRatingChange(star)}
                className="p-1 focus:outline-none"
              >
                {star <= formData.rating ? (
                  <StarIconSolid className="w-8 h-8 text-yellow-400" />
                ) : (
                  <StarIcon className="w-8 h-8 text-gray-300" />
                )}
              </button>
            ))}
          </div>
          {errors.rating && (
            <p className="mt-1 text-sm text-red-500">{errors.rating}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Comment
          </label>
          <textarea
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            rows="4"
            className="input"
            placeholder="Write your review here..."
          ></textarea>
        </div>
      </div>

      <div className="mt-8 flex justify-end space-x-3">
        <button type="button" onClick={onCancel} className="btn btn-secondary">
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          {review ? "Update Review" : "Add Review"}
        </button>
      </div>
    </form>
  );
}

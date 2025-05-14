"use client";

import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";

export default function ReviewTable({ reviews, onEdit, onDelete }) {
  if (reviews.length === 0) {
    return (
      <div className="card p-12 text-center text-gray-500">
        No reviews found. Try adjusting your search or filters.
      </div>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="table-container">
      <table className="table">
        <thead className="table-header">
          <tr>
            <th className="table-header-cell">Item</th>
            <th className="table-header-cell">User</th>
            <th className="table-header-cell">Rating</th>
            <th className="table-header-cell">Comment</th>
            <th className="table-header-cell">Date</th>
            <th className="table-header-cell">Actions</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {reviews.map((review) => (
            <tr key={review._id} className="table-row">
              <td className="table-cell font-medium text-gray-900">
                {review.itemTitle}
              </td>
              <td className="table-cell">{review.userName}</td>
              <td className="table-cell">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`w-5 h-5 ${
                        i < review.rating ? "text-yellow-400" : "text-gray-200"
                      }`}
                    />
                  ))}
                </div>
              </td>
              <td className="table-cell">
                <div className="max-w-xs truncate">{review.comment}</div>
              </td>
              <td className="table-cell">{formatDate(review.createdAt)}</td>
              <td className="table-cell">
                <div className="flex space-x-2">
                  <button
                    onClick={() => onEdit(review)}
                    className="p-1 rounded-full hover:bg-gray-100"
                  >
                    <PencilIcon className="w-5 h-5 text-blue-600" />
                  </button>
                  <button
                    onClick={() => onDelete(review._id)}
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

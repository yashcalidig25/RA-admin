"use client";
import { useState, useEffect } from "react";
import { PlusIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import ReviewForm from "./ReviewForm";
import ReviewTable from "./ReviewTable";

export default function ReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [ratingFilter, setRatingFilter] = useState("ALL");

  // Simulate fetching reviews
  useEffect(() => {
    // In a real app, this would be an API call
    setTimeout(() => {
      setReviews([
        {
          _id: "1",
          itemId: "1",
          userId: "1",
          rating: 5,
          comment:
            "Excellent laptop, worked perfectly for my needs. Would rent again!",
          createdAt: "2023-05-15T10:30:00.000Z",
          // Additional data for display purposes
          itemTitle: 'MacBook Pro 16"',
          userName: "John Doe",
        },
        {
          _id: "2",
          itemId: "2",
          userId: "2",
          rating: 4,
          comment: "Great bike, but had some minor issues with the gears.",
          createdAt: "2023-05-10T14:20:00.000Z",
          // Additional data for display purposes
          itemTitle: "Mountain Bike",
          userName: "Jane Smith",
        },
        {
          _id: "3",
          itemId: "3",
          userId: "3",
          rating: 3,
          comment:
            "Camera was okay, but had some scratches that weren't mentioned in the description.",
          createdAt: "2023-05-05T09:15:00.000Z",
          // Additional data for display purposes
          itemTitle: "DSLR Camera",
          userName: "Bob Johnson",
        },
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleAddReview = () => {
    setEditingReview(null);
    setShowForm(true);
  };

  const handleEditReview = (review) => {
    setEditingReview(review);
    setShowForm(true);
  };

  const handleSaveReview = (reviewData) => {
    if (editingReview) {
      // Update existing review
      setReviews(
        reviews.map((review) =>
          review._id === editingReview._id
            ? { ...review, ...reviewData }
            : review
        )
      );
    } else {
      // Add new review
      setReviews([
        ...reviews,
        {
          _id: Date.now().toString(),
          ...reviewData,
          createdAt: new Date().toISOString(),
          // In a real app, these would be fetched from the database
          itemTitle: "New Item",
          userName: "Current User",
        },
      ]);
    }
    setShowForm(false);
  };

  const handleDeleteReview = (reviewId) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      setReviews(reviews.filter((review) => review._id !== reviewId));
    }
  };

  const filteredReviews = reviews.filter((review) => {
    const matchesSearch =
      review.itemTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (review.comment &&
        review.comment.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesRating =
      ratingFilter === "ALL" || review.rating === Number.parseInt(ratingFilter);

    return matchesSearch && matchesRating;
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Reviews Management</h1>
        <button
          className="btn btn-primary flex items-center"
          onClick={handleAddReview}
        >
          <PlusIcon className="w-5 h-5 mr-1" />
          Add Review
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
              placeholder="Search reviews..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="w-full md:w-48">
            <select
              className="select"
              value={ratingFilter}
              onChange={(e) => setRatingFilter(e.target.value)}
            >
              <option value="ALL">All Ratings</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </select>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="card p-12 flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <ReviewTable
          reviews={filteredReviews}
          onEdit={handleEditReview}
          onDelete={handleDeleteReview}
        />
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <ReviewForm
              review={editingReview}
              onSave={handleSaveReview}
              onCancel={() => setShowForm(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

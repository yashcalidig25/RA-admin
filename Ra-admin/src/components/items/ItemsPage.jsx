"use client";
import { useState, useEffect } from "react";
import { PlusIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import ItemForm from "./ItemForm";
import ItemTable from "./ItemTable";

export default function ItemsPage() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [availabilityFilter, setAvailabilityFilter] = useState("ALL");

  // Simulate fetching items
  useEffect(() => {
    // In a real app, this would be an API call
    setTimeout(() => {
      setItems([
        {
          _id: "1",
          title: 'MacBook Pro 16"',
          description: "Latest model with M1 Pro chip, 16GB RAM, 512GB SSD",
          category: "Electronics",
          subCategory: "Laptops",
          brand: "Apple",
          model: "MacBook Pro",
          pricePerDay: 50,
          condition: "Excellent",
          ownerId: "1",
          images: ["/placeholder.svg?height=100&width=100"],
          available: true,
          location: "New York, NY",
        },
        {
          _id: "2",
          title: "Mountain Bike",
          description: "Professional mountain bike, perfect for trails",
          category: "Sports",
          subCategory: "Bikes",
          brand: "Trek",
          model: "X-Caliber 8",
          pricePerDay: 25,
          condition: "Good",
          ownerId: "2",
          images: ["/placeholder.svg?height=100&width=100"],
          available: true,
          location: "Denver, CO",
        },
        {
          _id: "3",
          title: "DSLR Camera",
          description: "Professional camera with multiple lenses",
          category: "Electronics",
          subCategory: "Cameras",
          brand: "Canon",
          model: "EOS 5D Mark IV",
          pricePerDay: 35,
          condition: "Like New",
          ownerId: "1",
          images: ["/placeholder.svg?height=100&width=100"],
          available: false,
          location: "Los Angeles, CA",
        },
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleAddItem = () => {
    setEditingItem(null);
    setShowForm(true);
  };

  const handleEditItem = (item) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleSaveItem = (itemData) => {
    if (editingItem) {
      // Update existing item
      setItems(
        items.map((item) =>
          item._id === editingItem._id ? { ...item, ...itemData } : item
        )
      );
    } else {
      // Add new item
      setItems([
        ...items,
        {
          _id: Date.now().toString(),
          ...itemData,
          ownerId: "1", // In a real app, this would be the current user's ID
        },
      ]);
    }
    setShowForm(false);
  };

  const handleDeleteItem = (itemId) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      setItems(items.filter((item) => item._id !== itemId));
    }
  };

  const handleToggleAvailability = (itemId) => {
    setItems(
      items.map((item) =>
        item._id === itemId ? { ...item, available: !item.available } : item
      )
    );
  };

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.description &&
        item.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory =
      categoryFilter === "ALL" || item.category === categoryFilter;
    const matchesAvailability =
      availabilityFilter === "ALL" ||
      (availabilityFilter === "AVAILABLE" && item.available) ||
      (availabilityFilter === "UNAVAILABLE" && !item.available);
    return matchesSearch && matchesCategory && matchesAvailability;
  });

  // Get unique categories for filter
  const categories = ["ALL", ...new Set(items.map((item) => item.category))];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Items Management</h1>
        <button
          className="btn btn-primary flex items-center"
          onClick={handleAddItem}
        >
          <PlusIcon className="w-5 h-5 mr-1" />
          Add Item
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
              placeholder="Search items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="w-full md:w-48">
            <select
              className="select"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category === "ALL" ? "All Categories" : category}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full md:w-48">
            <select
              className="select"
              value={availabilityFilter}
              onChange={(e) => setAvailabilityFilter(e.target.value)}
            >
              <option value="ALL">All Availability</option>
              <option value="AVAILABLE">Available</option>
              <option value="UNAVAILABLE">Unavailable</option>
            </select>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="card p-12 flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <ItemTable
          items={filteredItems}
          onEdit={handleEditItem}
          onDelete={handleDeleteItem}
          onToggleAvailability={handleToggleAvailability}
        />
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <ItemForm
              item={editingItem}
              onSave={handleSaveItem}
              onCancel={() => setShowForm(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

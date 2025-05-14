"use client";

import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

export default function ItemTable({
  items,
  onEdit,
  onDelete,
  onToggleAvailability,
}) {
  if (items.length === 0) {
    return (
      <div className="card p-12 text-center text-gray-500">
        No items found. Try adjusting your search or filters.
      </div>
    );
  }

  return (
    <div className="table-container">
      <table className="table">
        <thead className="table-header">
          <tr>
            <th className="table-header-cell">Item</th>
            <th className="table-header-cell">Category</th>
            <th className="table-header-cell">Price/Day</th>
            <th className="table-header-cell">Condition</th>
            <th className="table-header-cell">Location</th>
            <th className="table-header-cell">Status</th>
            <th className="table-header-cell">Actions</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {items.map((item) => (
            <tr key={item._id} className="table-row">
              <td className="table-cell">
                <div className="flex items-center">
                  <img
                    src={
                      item.images[0] || "/placeholder.svg?height=40&width=40"
                    }
                    alt={item.title}
                    className="w-10 h-10 rounded-md mr-3 object-cover"
                  />
                  <div>
                    <div className="font-medium text-gray-900">
                      {item.title}
                    </div>
                    <div className="text-xs text-gray-500 truncate max-w-xs">
                      {item.description}
                    </div>
                  </div>
                </div>
              </td>
              <td className="table-cell">
                <div>{item.category}</div>
                <div className="text-xs text-gray-500">{item.subCategory}</div>
              </td>
              <td className="table-cell font-medium">
                ${item.pricePerDay}/day
              </td>
              <td className="table-cell">{item.condition}</td>
              <td className="table-cell">{item.location}</td>
              <td className="table-cell">
                <button
                  onClick={() => onToggleAvailability(item._id)}
                  className={`px-2 py-1 text-xs rounded-full ${
                    item.available
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {item.available ? "Available" : "Unavailable"}
                </button>
              </td>
              <td className="table-cell">
                <div className="flex space-x-2">
                  <button
                    onClick={() => onEdit(item)}
                    className="p-1 rounded-full hover:bg-gray-100"
                  >
                    <PencilIcon className="w-5 h-5 text-blue-600" />
                  </button>
                  <button
                    onClick={() => onDelete(item._id)}
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

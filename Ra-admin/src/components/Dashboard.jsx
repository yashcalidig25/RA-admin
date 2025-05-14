import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  UserGroupIcon,
  ShoppingBagIcon,
  ChatBubbleLeftRightIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from "@heroicons/react/24/outline";

export default function Dashboard() {
  const [stats, setStats] = useState({
    users: { total: 0, active: 0, inactive: 0 },
    items: { total: 0, available: 0, unavailable: 0 },
    reviews: { total: 0, avgRating: 0 },
  });

  // Simulate fetching stats
  useEffect(() => {
    // In a real app, this would be an API call
    const fetchStats = async () => {}
    setStats({
      users: { total: 245, active: 198, inactive: 47 },
      items: { total: 532, available: 423, unavailable: 109 },
      reviews: { total: 1245, avgRating: 4.2 },
    });
  }, []);

  const statCards = [
    {
      title: "Total Users",
      value: stats.users.total,
      icon: UserGroupIcon,
      change: 12,
      changeType: "increase",
      details: [
        { label: "Active", value: stats.users.active },
        { label: "Inactive", value: stats.users.inactive },
      ],
      link: "/users",
    },
    {
      title: "Total Items",
      value: stats.items.total,
      icon: ShoppingBagIcon,
      change: 8,
      changeType: "increase",
      details: [
        { label: "Available", value: stats.items.available },
        { label: "Unavailable", value: stats.items.unavailable },
      ],
      link: "/items",
    },
    {
      title: "Total Reviews",
      value: stats.reviews.total,
      icon: ChatBubbleLeftRightIcon,
      change: 3,
      changeType: "decrease",
      details: [{ label: "Avg Rating", value: stats.reviews.avgRating }],
      link: "/reviews",
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {statCards.map((card, index) => (
          <Link
            to={card.link}
            key={index}
            className="card hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-lg font-semibold text-gray-700">
                  {card.title}
                </h2>
                <p className="text-3xl font-bold mt-2">{card.value}</p>
                <div className="flex items-center mt-2">
                  {card.changeType === "increase" ? (
                    <ArrowUpIcon className="w-4 h-4 text-green-500 mr-1" />
                  ) : (
                    <ArrowDownIcon className="w-4 h-4 text-red-500 mr-1" />
                  )}
                  <span
                    className={
                      card.changeType === "increase"
                        ? "text-green-500"
                        : "text-red-500"
                    }
                  >
                    {card.change}% from last month
                  </span>
                </div>
              </div>
              <div className="p-3 rounded-full bg-blue-100">
                <card.icon className="w-6 h-6 text-blue-600" />
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2">
              {card.details.map((detail, i) => (
                <div key={i} className="bg-gray-50 p-2 rounded">
                  <p className="text-xs text-gray-500">{detail.label}</p>
                  <p className="font-semibold">{detail.value}</p>
                </div>
              ))}
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Recent Users</h2>
            <Link to="/users" className="text-sm text-blue-600 hover:underline">
              View all
            </Link>
          </div>
          <div className="table-container">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="table-header-cell">Name</th>
                  <th className="table-header-cell">Email</th>
                  <th className="table-header-cell">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {[
                  {
                    name: "John Doe",
                    email: "john@example.com",
                    status: "ACTIVE",
                  },
                  {
                    name: "Jane Smith",
                    email: "jane@example.com",
                    status: "ACTIVE",
                  },
                  {
                    name: "Bob Johnson",
                    email: "bob@example.com",
                    status: "INACTIVE",
                  },
                ].map((user, i) => (
                  <tr key={i}>
                    <td className="table-cell font-medium text-gray-900">
                      {user.name}
                    </td>
                    <td className="table-cell">{user.email}</td>
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Recent Items</h2>
            <Link to="/items" className="text-sm text-blue-600 hover:underline">
              View all
            </Link>
          </div>
          <div className="table-container">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="table-header-cell">Title</th>
                  <th className="table-header-cell">Category</th>
                  <th className="table-header-cell">Price/Day</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {[
                  { title: "MacBook Pro", category: "Electronics", price: 50 },
                  { title: "Mountain Bike", category: "Sports", price: 25 },
                  { title: "DSLR Camera", category: "Electronics", price: 35 },
                ].map((item, i) => (
                  <tr key={i}>
                    <td className="table-cell font-medium text-gray-900">
                      {item.title}
                    </td>
                    <td className="table-cell">{item.category}</td>
                    <td className="table-cell">${item.price}/day</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

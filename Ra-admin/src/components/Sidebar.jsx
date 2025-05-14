import { NavLink } from "react-router-dom";
import {
  HomeIcon,
  UserGroupIcon,
  ShoppingBagIcon,
  ChatBubbleLeftRightIcon,
  ArrowLeftOnRectangleIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "./provider/AuthContext";

export default function Sidebar() {
  const { logout } = useAuth();
  const menuItems = [
    { id: "/", name: "Dashboard", icon: HomeIcon },
    { id: "/users", name: "Users", icon: UserGroupIcon },
    { id: "/seller-requests", name: "Seller Requests", icon: UserPlusIcon },
    { id: "/items", name: "Items", icon: ShoppingBagIcon },
    { id: "/reviews", name: "Reviews", icon: ChatBubbleLeftRightIcon },
  ];

  return (
    <div className="w-64 bg-white shadow-md">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-blue-600">Admin Panel</h1>
      </div>
      <nav className="mt-6">
        <ul>
          {menuItems.map((item) => (
            <li key={item.id}>
              <NavLink
                to={item.id}
                className={({ isActive }) =>
                  `flex items-center w-full px-6 py-3 text-left ${
                    isActive
                      ? "bg-blue-50 text-blue-600 border-r-4 border-blue-600"
                      : "text-gray-600 hover:bg-gray-50"
                  }`
                }
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="absolute bottom-0 w-64 p-6">
        <button
          onClick={logout}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeftOnRectangleIcon className="w-5 h-5 mr-3" />
          Logout
        </button>
      </div>
    </div>
  );
}

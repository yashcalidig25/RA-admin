// import { Routes, Route } from "react-router-dom";
// import { useState } from "react";
// import Layout from "./components/Layout";
// import Dashboard from "./components/Dashboard";
// import UsersPage from "./components/users/UsersPage";
// import ItemsPage from "./components/items/ItemsPage";
// import ReviewsPage from "./components/reviews/ReviewsPage";
// import NotFound from "./components/NotFound";
// import SellerRequests from "./components/seller_requests/SellerRequests";
// import axios from "axios";

// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   // set axios base URL
//   axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;

//   // Protected route component
//   const ProtectedRoute = ({ children }) => {
//     if (!isAuthenticated) {
//       return <Navigate to="/login" replace />;
//     }

//     return children;
//   };
//   return (
//     <Routes>
//       <Route path="/" element={<Layout />}>
//         <Route index element={<Dashboard />} />
//         <Route path="users" element={<UsersPage />} />
//         <Route path="items" element={<ItemsPage />} />
//         <Route path="reviews" element={<ReviewsPage />} />
//         <Route path="/seller-requests" element={<SellerRequests />} />
//         <Route path="*" element={<NotFound />} />
//       </Route>
//     </Routes>
//   );
// }

// export default App;

import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Layout from "./components/Layout";
import Dashboard from "./components/Dashboard";
import UsersPage from "./components/users/UsersPage";
import ItemsPage from "./components/items/ItemsPage";
import ReviewsPage from "./components/reviews/ReviewsPage";
import NotFound from "./components/NotFound";
import SellerRequests from "./components/seller_requests/SellerRequests";
import Login from "./components/login/Login";
import { useAuth } from "./components/provider/AuthContext";

function App() {
  const { user } = useAuth();
  const [isAuth, setIsAuth] = useState();

  useEffect(() => {
    setIsAuth(!!user);
  }, [user]);

  // Protected route component
  const ProtectedRoute = ({ children }) => {
    if (!isAuth) {
      return <Navigate to="/login" replace />;
    }

    return children;
  };
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Layout />}>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <UsersPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/items"
          element={
            <ProtectedRoute>
              <ItemsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/reviews"
          element={
            <ProtectedRoute>
              <ReviewsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/seller-requests"
          element={
            <ProtectedRoute>
              <SellerRequests />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;

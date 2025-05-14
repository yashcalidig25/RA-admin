import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Layout from "./components/Layout";
import Dashboard from "./components/Dashboard";
import UsersPage from "./components/users/UsersPage";
import ItemsPage from "./components/items/ItemsPage";
import ReviewsPage from "./components/reviews/ReviewsPage";
import NotFound from "./components/NotFound";
import SellerRequests from "./components/seller_requests/SellerRequests";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Protected route component
  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }

    return children;
  };
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="items" element={<ItemsPage />} />
        <Route path="reviews" element={<ReviewsPage />} />
        <Route path="/seller-requests" element={<SellerRequests />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;

// import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
// import { useState } from "react";
// import Layout from "./components/Layout";
// import Dashboard from "./components/Dashboard";
// import UsersPage from "./components/users/UsersPage";
// import ItemsPage from "./components/items/ItemsPage";
// import ReviewsPage from "./components/reviews/ReviewsPage";
// import NotFound from "./components/NotFound";
// import SellerRequests from "./components/seller_requests/SellerRequests";
// import Login from "./components/login/Login";

// function App() {
//   const navigate = useNavigate();
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

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
//         <Route path="/login" element={<Login />} />
//         <Route
//           path="/"
//           element={
//             <ProtectedRoute>
//               <Dashboard />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/users"
//           element={
//             <ProtectedRoute>
//               <UsersPage />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/items"
//           element={
//             <ProtectedRoute>
//               <ItemsPage />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/reviews"
//           element={
//             <ProtectedRoute>
//               <ReviewsPage />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/seller-requests"
//           element={
//             <ProtectedRoute>
//               <SellerRequests />
//             </ProtectedRoute>
//           }
//         />
//         <Route path="*" element={<NotFound />} />
//       </Route>
//     </Routes>
//   );
// }

// export default App;

import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./components/Dashboard";
import UsersPage from "./components/users/UsersPage";
import ItemsPage from "./components/items/ItemsPage";
import ReviewsPage from "./components/reviews/ReviewsPage";
import NotFound from "./components/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="items" element={<ItemsPage />} />
        <Route path="reviews" element={<ReviewsPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;

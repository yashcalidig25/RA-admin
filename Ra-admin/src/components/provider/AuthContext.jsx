import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Create context
const AuthContext = createContext();

// Auth provider component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Check if user is logged in on initial load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check for stored auth token
        const token = localStorage.getItem("adminAuthToken");

        if (token) {
          // In a real app, you would validate the token with your backend
          // For demo, we'll just set a mock user
          setUser({
            id: "1",
            name: "Admin User",
            email: "admin@example.com",
            role: "admin",
          });
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        localStorage.removeItem("adminAuthToken");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Login function
  const login = async (email, password) => {
    setLoading(true);

    try {
      // In a real app, you would make an API call to your backend
      // For demo purposes, we'll just simulate a successful login
      if (email === "admin@example.com" && password === "password") {
        const mockUser = {
          id: "1",
          name: "Admin User",
          email,
          role: "admin",
        };

        // Store token in localStorage
        localStorage.setItem("adminAuthToken", "mock-jwt-token");

        setUser(mockUser);
        return { success: true };
      }

      return { success: false, message: "Invalid email or password" };
    } catch (error) {
      console.error("Login failed:", error);
      return { success: false, message: "An error occurred during login" };
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("adminAuthToken");
    setUser(null);
    navigate("/login");
  };

  //   useEffect(() => {
  // const token = localStorage.getItem("adminAuthToken")
  // if(token){
  //   setIsAuthenticated(true)
  // }
  // })

  // Context value
  const value = {
    user,
    loading,
    isAuthenticated: user !== null,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

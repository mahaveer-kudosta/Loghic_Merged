import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

// Create context
const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("authToken") || null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize auth state from localStorage on component mount
  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem("authToken");
      
      if (storedToken) {
        try {
          // Set default axios auth header
          axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
          
          // Fetch user data with token
          const response = await axios.get("/api/users/me");
          setUser(response.data);
          setToken(storedToken);
        } catch (error) {
          console.error("Error initializing auth:", error);
          // If token is invalid, clear local storage
          localStorage.removeItem("authToken");
          setToken(null);
        }
      }
      
      setLoading(false);
    };

    initializeAuth();
  }, []);

  // Set axios auth header when token changes
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [token]);

  // Login function
  const login = async (email, password) => {
    try {
      setError(null);
      setLoading(true);
      
      const response = await axios.post("/api/auth/login", { email, password });
      const { token, user } = response.data;
      
      // Save token to localStorage
      localStorage.setItem("authToken", token);
      
      // Update state
      setToken(token);
      setUser(user);
      
      return user;
    } catch (error) {
      console.error("Login error:", error);
      
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Failed to login. Please try again.");
      }
      
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (userData) => {
    try {
      setError(null);
      setLoading(true);
      
      const response = await axios.post("/api/auth/register", userData);
      return response.data;
    } catch (error) {
      console.error("Registration error:", error);
      
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Failed to register. Please try again.");
      }
      
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      // Call logout API endpoint
      await axios.post("/api/auth/logout");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Clear token from localStorage and state
      localStorage.removeItem("authToken");
      setToken(null);
      setUser(null);
    }
  };

  // Update user profile
  const updateProfile = async (userData) => {
    try {
      setError(null);
      setLoading(true);
      
      const response = await axios.put("/api/users/profile", userData);
      setUser(response.data);
      
      return response.data;
    } catch (error) {
      console.error("Profile update error:", error);
      
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Failed to update profile. Please try again.");
      }
      
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Check if user is authenticated
  const isAuthenticated = !!token && !!user;

  // Context value
  const value = {
    user,
    token,
    loading,
    error,
    login,
    register,
    logout,
    updateProfile,
    isAuthenticated,
    setError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the auth context
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  
  return context;
};

export default AuthContext;
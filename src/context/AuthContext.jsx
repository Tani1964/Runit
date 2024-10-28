import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";  // Assuming you're using React Router

// Create Auth Context
export const AuthContext = createContext(null);

// Custom Hook to Use Auth Context
export const useAuth = () => useContext(AuthContext);

// Axios Instance Configuration
export const axi = axios.create({
  baseURL: "https://runit-78od.onrender.com/",
});

// Axios Request Interceptor
axi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("runitAuthToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Axios Response Interceptor with Token Refresh and Redirect Logic
axi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const navigate = useNavigate(); // For navigation

    // If 401 Unauthorized and not yet retried
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) throw new Error("No refresh token available");

        // Try to refresh token
        const { data } = await axios.post(
          "https://runit-78od.onrender.com/users/token/refresh/",
          { refresh: refreshToken }
        );

        const newAccessToken = data.accessToken;

        // Store new token
        localStorage.setItem("runitAuthToken", newAccessToken);

        // Update authorization headers with the new token
        axi.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        // Retry the original request
        return axi(originalRequest);

      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);

        // Clear tokens and auth state
        localStorage.removeItem("runitAuthToken");
        localStorage.removeItem("refreshToken");

        // Redirect to the sign-in page
        navigate("runam/auth/signin");  // Assuming you have a sign-in route

        return Promise.reject(refreshError);
      }
    }

    // If the request was retried and still failed
    if (error.response?.status === 401 && originalRequest._retry) {
      // Clear tokens and redirect to the sign-in page
      localStorage.removeItem("runitAuthToken");
      localStorage.removeItem("refreshToken");
      navigate("/signin");
    }

    return Promise.reject(error);
  }
);

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: localStorage.getItem("runitAuthToken"),
    authenticated: false,
  });

  // Load Tokens on App Start
  useEffect(() => {
    const loadTokens = () => {
      try {
        const token = localStorage.getItem("runitAuthToken");
        const refreshToken = localStorage.getItem("refreshToken");

        if (token && refreshToken) {
          axi.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          setAuthState({ token, authenticated: true });
        } else {
          console.log("No tokens found.");
        }
      } catch (error) {
        console.error("Error loading tokens:", error);
      }
    };
    loadTokens();
  }, []);

  // Update Axios Headers When Auth State Changes
  useEffect(() => {

    if (authState.token) {
      axi.defaults.headers.common["Authorization"] = `Bearer ${authState.token}`;
    } else {
      delete axi.defaults.headers.common["Authorization"];
    }
  }, [authState]);

  // signout Function
  const signout = () => {
    try {
      localStorage.removeItem("runitAuthToken");
      localStorage.removeItem("refreshToken");
      setAuthState({ token: null, authenticated: false });
      console.log("Logged out successfully.");
    } catch (error) {
      console.error("Error during signout:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ authState, setAuthState, signout }}>
      {children}
    </AuthContext.Provider>
  );
};

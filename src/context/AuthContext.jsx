// authContext.jsx
import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

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

// Axios Response Interceptor with Token Refresh Logic
axi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) throw new Error("No refresh token available");

        const { data } = await axios.post(
          "https://runit-78od.onrender.com/auth/refresh-token",
          { token: refreshToken }
        );

        const newAccessToken = data.accessToken;

        localStorage.setItem("runitAuthToken", newAccessToken);

        axi.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        return axi(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: null,
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

  // Logout Function
  const logout = () => {
    try {
      localStorage.removeItem("runitAuthToken");
      localStorage.removeItem("refreshToken");
      setAuthState({ token: null, authenticated: false });
      console.log("Logged out successfully.");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ authState, setAuthState, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

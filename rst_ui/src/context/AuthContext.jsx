import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  // ✅ LOGIN
  const login = async (credentials) => {
    const response = await axios.post(
      "http://localhost:8000/api/login",
      credentials
    );

    const data = response.data;

    // store
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    setUser(data.user);

    return data; // 🔥 important (so component can use role)
  };


  // ✅ LOGOUT (UPDATED)
  const logout = async () => {
    try {
      const token = localStorage.getItem("token");

      if (token) {
        await axios.post(
          "http://localhost:8000/api/logout",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      toast.success("Logged out successfully");

    } catch (error) {
      console.log("Logout API failed");
    } finally {
      // 🔥 always clear frontend
      localStorage.clear();
      setUser(null);
      toast.success("Logged out successfully");
      navigate("/login");
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ custom hook
export const useAuth = () => useContext(AuthContext);
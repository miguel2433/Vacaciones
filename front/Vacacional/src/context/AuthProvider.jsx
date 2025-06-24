import React, { useState, useEffect } from "react";
import { AuthContext } from "./Authentication.jsx";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { loginService, registerService, logoutService } from "../service/Authentication.js";

export const AuthProvider = ({ children }) => {
  const [, setError] = useState(null);
  const [token, setToken] = useState(Cookies.get("access_token") || null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log("🔹 Token decodificado en AuthProvider:", decoded);
        if (decoded.exp * 1000 < Date.now()) {
          logout();
        } else {
          setUser(decoded);
        }
      } catch {
        logout();
      }
    }
    setIsLoading(false);
  }, [token]);

const login = async (correo, contrasena) => {
  setIsLoading(true);
  try {
    const { token } = await loginService(correo, contrasena);
    Cookies.set("access_token", token, { expires: 1, secure: true, sameSite: "Strict" });
    setToken(token);
    setUser(jwtDecode(token));
    return { token, error: null }; // <-- fijate que error sea null explícito
  } catch (error) {
    console.error("Ha ocurrido un error: ", error);
    setError("Credenciales incorrectas. Inténtalo de nuevo.");
    return { token: "", error: `Ha ocurrido un error ${error} Inténtalo de nuevo.` };
  } finally {
    setIsLoading(false);
  }
};


  const register = async (nombre, email, password, dni) => {
    setIsLoading(true);
    setError(null);
    try {
      if (!nombre || !email || !password || !dni) {
        setError("Por favor, completa todos los campos.");
        return;
      }
      const { token } = await registerService(nombre, email, password, dni);
      Cookies.set("authToken", token, { expires: 1, secure: true, sameSite: "Strict" });

      setToken(token);
      setUser(jwtDecode(token));
    } catch (error) {
      console.error("Error en el registro:", error);
      setError("Error al registrar usuario. Inténtalo de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    await logoutService();
    Cookies.remove("authToken");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!token, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

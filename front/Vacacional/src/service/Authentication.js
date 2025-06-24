import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const API_URL = "https://c24-69-webapp.onrender.com/usuario";

export const loginService = async (correo, contrasena) => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ contrasena, correo }),
  });

  if (!response.ok) throw new Error("Credenciales incorrectas");

  const authHeader = response.headers.get("authorization");
  const token = authHeader ? authHeader.split(" ")[1] : (await response.json()).token;

  try {
    const decoded = jwtDecode(token);
    console.log("🔹 Token decodificado en loginService:", decoded);
  } catch {
    throw new Error("Token inválido");
  }

  return { token };
};

export const registerService = async (nombre, apellido, email, rol, departamento, celular, contrasena, dni) => {
  console.log("Datos de usuario en AuthService.js:", nombre, apellido, email, rol, departamento, celular, contrasena, dni);

  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombre, apellido, email, rol, departamento, celular, contrasena, dni }),
  });

  console.log("Response de AuthService:", response);

  if (!response.ok) throw new Error("Error al registrar usuario");

  const authHeader = response.headers.get("Authorization");
  const token = authHeader ? authHeader.split(" ")[1] : (await response.json()).token;

  Cookies.set("authToken", token, { expires: 1, secure: true, sameSite: "Strict" });
  console.log("Token en AuthService:", token);
  return { token };
};

export const logoutService = async () => {
  Cookies.remove("authToken");
};

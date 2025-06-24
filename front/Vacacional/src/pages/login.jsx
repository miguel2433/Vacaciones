import React, { useContext } from "react";
import LoginForm from "../componentes/LoginForm.jsx";
import { WaveText } from "../componentes/WaterText.jsx";
import { AuthContext } from "../context/Authentication.jsx";
import { useNavigate } from "react-router-dom";

function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();
  const data = new FormData(e.target);
  const correo = data.get("correo");
  const contrasena = data.get("contrasena");

  for (let pair of data.entries()) {
    console.log(`${pair[0]}: ${pair[1]}`);
  }

  try {
    const res = await login(correo, contrasena);
    console.log("respuesta de login:", res);

    if (!res.error) {
      navigate("/");
    } else {
      alert(res.error);
    }
  } catch (err) {
    alert("Error al iniciar sesión.");
  }
};

  return (
        <div className="relative flex justify-center items-center h-[100%] w-[100%]">
            <WaveText text="Vacations" />
            <LoginForm onSubmit={handleSubmit} />
        </div>
  );
}

export default Login;

import React from "react";

const LoginForm = ({ onSubmit }) => {
  return (
    <div className="login">
      <h1 className="titulo">Login</h1>
      <form onSubmit={onSubmit}>
      <div className="label-animation">
        <label htmlFor="correo">Correo</label>
        <input
          type="email"
          name="correo"
          id="correo"
          placeholder="example@gmail.com"
          required
        />
      </div>

      <div className="label-animation">
        <label htmlFor="contrasena">Contraseña</label>
        <input
          type="password"
          name="contrasena"
          id="contrasena"
          placeholder="Contraseña"
          required
        />
      </div>

        <button type="submit">sign in</button>
      </form>
    </div>
  );
};

export default LoginForm;

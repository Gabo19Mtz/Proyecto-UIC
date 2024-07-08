import React, { useState } from "react";
import { register } from "../services/api";
import "./Auth.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register({ username, email, password });
      alert("Registro exitoso");
      window.location.href = "/";
    } catch (error) {
      alert("Error al registrar usuario");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Registro</h2>
        <input
          type="text"
          placeholder="Nombre de Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Correo Electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Registrarse</button>
        <p>
          ¿Ya tienes una cuenta? <a href="/">Iniciar sesión</a>
        </p>
      </form>
    </div>
  );
};

export default Register;

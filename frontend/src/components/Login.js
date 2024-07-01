import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/api";
import "../Auth.css"; 

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await login(email, password);
      setMessage(response.data.message);
      localStorage.setItem("token", response.data.token);
      navigate("/budgets");
    } catch (error) {
      if (error.response && error.response.data) {
        setMessage(error.response.data.message || "Error al iniciar sesión");
      } else {
        setMessage("Error de red. Inténtalo de nuevo más tarde.");
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Inicio de Sesión</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Contraseña:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Iniciar Sesión</button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default Login;

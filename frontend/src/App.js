import React, { useEffect, useState } from "react";
import api from "./api";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    api
      .get("/")
      .then((response) => {
        setMessage(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener datos del backend", error);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>{message}</p>
      </header>
    </div>
  );
}

export default App;

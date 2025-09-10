import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:3333")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);

  return (
    <div>
      <h1>React + AdonisJS</h1>
      <p>{message}</p>
    </div>
  )
}

export default App

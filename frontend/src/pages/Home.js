import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Home() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/games").then((res) => setGames(res.data));
  }, []);

  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </nav>
      <h1>Glowed - Play Games</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem" }}>
        {games.map((game) => (
          <div key={game._id} style={{ background: "#23233b", borderRadius: 8, padding: 16, width: 200 }}>
            <img src={game.image} alt={game.title} style={{ width: "100%", borderRadius: 8 }} />
            <h2>{game.title}</h2>
            <Link to={`/game/${game._id}`}>Play</Link>
            <div>
              <small>By {game.creator.username}</small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
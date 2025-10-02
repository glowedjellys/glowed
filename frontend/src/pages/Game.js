import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export default function Game() {
  const { id } = useParams();
  const [game, setGame] = useState(null);

  useEffect(() => {
    axios.get(`${API_URL}/api/games/${id}`).then((res) => setGame(res.data));
  }, [id]);

  if (!game) return <div>Loading...</div>;

  return (
    <div>
      <h1>{game.title}</h1>
      <img src={game.image} alt={game.title} style={{ width: 400, borderRadius: 8 }} />
      <p>{game.description}</p>
      {/* For web games, embed with iframe */}
      {game.url && (
        <iframe title={game.title} src={game.url} style={{ width: "800px", height: "450px", border: "none" }} />
      )}
      <div>
        <small>By {game.creator.username}</small>
      </div>
    </div>
  );
}
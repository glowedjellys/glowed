import React from "react";
import { useParams } from "react-router-dom";

export default function Profile() {
  const { username } = useParams();

  // For brevity, fetch user & games created by user here
  return (
    <div>
      <h1>Profile: {username}</h1>
      <p>This is the user profile page. (Expand as needed!)</p>
    </div>
  );
}
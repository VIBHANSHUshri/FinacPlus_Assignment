import React from "react";
import { createRoot } from "react-dom/client";
import MusicLibrary from "./musiclibrary";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MusicLibrary role="user" username="Guest" />
  </React.StrictMode>
);

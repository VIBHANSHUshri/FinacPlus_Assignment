import React, { createContext, useContext, useState, useEffect } from "react";

const STORAGE_KEY = "songs";

const defaultSongs = [
  { id: 1, title: "Song A", artist: "Artist 1", album: "Album X" },
  { id: 2, title: "Song B", artist: "Artist 2", album: "Album Y" },
];

const SongContext = createContext();
export const useSongs = () => useContext(SongContext);

export const SongProvider = ({ children }) => {
  const storedSongs = JSON.parse(localStorage.getItem(STORAGE_KEY));
  const [songs, setSongs] = useState(storedSongs || defaultSongs);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(songs));
  }, [songs]);

  const addSong = (song) =>
    setSongs([...songs, { ...song, id: Date.now() }]);

  const deleteSong = (id) =>
    setSongs(songs.filter((s) => s.id !== id));

  return (
    <SongContext.Provider value={{ songs, addSong, deleteSong }}>
      {children}
    </SongContext.Provider>
  );
};

import React, { useState } from "react";
import { SongProvider, useSongs } from "./songcontext";
import "./musiclibrary.css";

const MusicLibraryContent = ({ role, username }) => {
  const { songs, addSong, deleteSong } = useSongs();
  const [newTitle, setNewTitle] = useState("");
  const [newArtist, setNewArtist] = useState("");
  const [newAlbum, setNewAlbum] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [groupBy, setGroupBy] = useState("");

  const handleAddSong = () => {
    if (!newTitle.trim()) return;
    addSong({ title: newTitle, artist: newArtist, album: newAlbum });
    setNewTitle("");
    setNewArtist("");
    setNewAlbum("");
  };

  // Filter songs
  let displayedSongs = songs.filter(
    (s) =>
      s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.album.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort songs
  if (sortBy) {
    displayedSongs = [...displayedSongs].sort((a, b) =>
      a[sortBy].localeCompare(b[sortBy])
    );
  }

  // Group songs
  const groupedSongs = {};
  if (groupBy) {
    displayedSongs.forEach((song) => {
      const key = song[groupBy];
      if (!groupedSongs[key]) groupedSongs[key] = [];
      groupedSongs[key].push(song);
    });
  }

  return (
    <div className="music-library-container">
      <h2 className="welcome-msg">Welcome {username} ({role})</h2>

      <div className="controls">
        <input
          type="text"
          placeholder="Search by title, artist, album"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="">Sort By</option>
          <option value="title">Title</option>
          <option value="artist">Artist</option>
          <option value="album">Album</option>
        </select>
        <select value={groupBy} onChange={(e) => setGroupBy(e.target.value)}>
          <option value="">Group By</option>
          <option value="title">Title</option>
          <option value="artist">Artist</option>
          <option value="album">Album</option>
        </select>
      </div>

      {groupBy
        ? Object.keys(groupedSongs).map((group) => (
            <div key={group}>
              <h3 className="group-title">{group}</h3>
              <ul className="song-list">
                {groupedSongs[group].map((song) => (
                  <li key={song.id} className="song-item">
                    {song.title} - {song.artist} ({song.album})
                    {role === "admin" && (
                      <button
                        className="delete-btn"
                        onClick={() => deleteSong(song.id)}
                      >
                        Delete
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))
        : (
          <ul className="song-list">
            {displayedSongs.map((song) => (
              <li key={song.id} className="song-item">
               <span className="heading">Song Title - {song.title}</span ><span className="heading">Song Artist - {song.artist}</span> <span className="heading">Song Album - {song.album}</span> 
                {role === "admin" && (
                  <button
                    className="delete-btn"
                    onClick={() => deleteSong(song.id)}
                  >
                    Delete
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}

      {role === "admin" && (
        <div className="add-song-form">
          <input
            className="song-input"
            placeholder="Title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <input
            className="song-input"
            placeholder="Artist"
            value={newArtist}
            onChange={(e) => setNewArtist(e.target.value)}
          />
          <input
            className="song-input"
            placeholder="Album"
            value={newAlbum}
            onChange={(e) => setNewAlbum(e.target.value)}
          />
          <button className="add-btn" onClick={handleAddSong}>
            Add Song
          </button>
        </div>
      )}
    </div>
  );
};

export default function MusicLibrary({ role , username}) {
  // Default role and username set here
  return (
    <SongProvider>
      <MusicLibraryContent role={role} username={username} />
    </SongProvider>
  );
}

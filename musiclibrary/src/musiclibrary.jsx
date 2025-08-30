import React, { useState } from "react";
import { SongProvider, useSongs } from "./songcontext";
import "./musiclibrary.css";

const MusicLibraryContent = ({ role, username }) => {
  const { songs, addSong, deleteSong } = useSongs();
  const [newTitle, setNewTitle] = useState("");
  const [newArtist, setNewArtist] = useState("");
  const [newAlbum, setNewAlbum] = useState("");

  // Filters, sorting, grouping
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

  // Filtered and sorted songs
  let displayedSongs = songs.filter(
    (s) =>
      s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.album.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (sortBy) {
    displayedSongs = [...displayedSongs].sort((a, b) =>
      a[sortBy].localeCompare(b[sortBy])
    );
  }

  // Grouping
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

      {/* Search, sort, group controls */}
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

      {/* Song list */}
      {groupBy ? (
        Object.keys(groupedSongs).map((group) => (
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
      ) : (
        <ul className="song-list">
          {displayedSongs.map((song) => (
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
      )}

      {/* Add song for admin */}
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

export default function MusicLibrary({ role, username }) {
  return (
    <SongProvider>
      <MusicLibraryContent role={role} username={username} />
    </SongProvider>
  );
}

import React from "react";
import NoteCard from "../components/NoteCard";
import { Link } from "react-router-dom";

const Notes = ({ notes = [], loading = false, isRateLimited = false, setNotes }) => {
  if (isRateLimited) {
    return (
      <div className="text-center text-red-400 py-10">
        ⚠️ You've hit the rate limit. Please wait before trying again.
      </div>
    );
  }

  if (loading) {
    return (
      <div className="text-center text-green-400 py-10">
        ⏳ Loading notes...
      </div>
    );
  }

  if (notes.length === 0) {
    return (
      <div className="text-center text-gray-400 py-10">
        No notes found.
        <br />
        <Link
          to="/create"
          className="inline-block mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
        >
          Create One
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {notes.map((note) => (
        <NoteCard key={note._id} note={note} setNotes={setNotes} />
      ))}
    </div>
  );
};

export default Notes;

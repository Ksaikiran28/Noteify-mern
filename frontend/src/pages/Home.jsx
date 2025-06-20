import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import RateLimited from "../components/RateLimited";
import NotesNotFound from "../components/NotesNotFound";
import NoteCard from "../components/NoteCard";
import toast from "react-hot-toast";
import api from "../lib/axios";

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const notesPerPage = 6;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes");
        setNotes(res.data);
        setIsRateLimited(false);
      } catch (error) {
        console.error("Error fetching notes:", error);

        if (error.response?.status === 401) {
          toast.error("You are not logged in. Please login to view notes.");
          // Optionally redirect to login
          // setTimeout(() => navigate("/login"), 1500);
          return;
        }

        if (error.response?.status === 429) {
          setIsRateLimited(true);
          const resetTime = error.response?.headers["x-ratelimit-reset"];
          if (resetTime) {
            const time = new Date(parseInt(resetTime) * 1000).toLocaleTimeString();
            toast.error(`Rate limit exceeded. Try again at ${time}`);
          } else {
            toast.error("Rate limit exceeded. Try again later.");
          }
        } else {
          toast.error("Failed to load notes");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [navigate]);

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredNotes.length / notesPerPage);
  const indexOfLastNote = currentPage * notesPerPage;
  const indexOfFirstNote = indexOfLastNote - notesPerPage;
  const currentNotes = filteredNotes.slice(indexOfFirstNote, indexOfLastNote);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      {isRateLimited && <RateLimited />}

      <div className="max-w-7xl mx-auto p-4 mt-6">
        <input
          type="text"
          placeholder="Search notes..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1); // Reset to first page on search
          }}
          className="w-full sm:w-1/2 px-4 py-2 mb-6 rounded-md bg-gray-900 text-white border border-gray-700"
        />

        {loading && !isRateLimited && (
          <div className="text-center py-10 text-green-400 text-lg">
            Loading notes...
          </div>
        )}

        {!loading && currentNotes.length === 0 && !isRateLimited && (
          <NotesNotFound />
        )}

        {!loading && currentNotes.length > 0 && !isRateLimited && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentNotes.map((note) => (
                <NoteCard key={note._id} note={note} setNotes={setNotes} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center mt-8 space-x-2">
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`px-4 py-2 rounded ${
                      currentPage === index + 1
                        ? "bg-green-500"
                        : "bg-gray-700 hover:bg-gray-600"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Home;

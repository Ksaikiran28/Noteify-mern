import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { ArrowLeftIcon, Trash2Icon } from "lucide-react";
import toast from "react-hot-toast";
import api from "../lib/axios.js";

const NoteDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const { data } = await api.get(`/notes/${id}`);
        setTitle(data.title);
        setContent(data.content);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch note.");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id, navigate]);

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      toast.error("Title and content cannot be empty.");
      return;
    }

    try {
      setSaving(true);
      await api.put(`/notes/${id}`, { title, content });
      toast.success("Note updated successfully.");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update note.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this note?");
    if (!confirmDelete) return;

    try {
      setDeleting(true);
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted.");
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete note.");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-green-400">
        Loading note...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 text-base-content px-4 py-10">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <Link
            to="/"
            className="btn btn-outline border-green-400 text-green-400 hover:bg-green-400 hover:text-black transition duration-200"
          >
            <ArrowLeftIcon className="size-4 mr-2" />
            Back to Notes
          </Link>

          <button
            onClick={handleDelete}
            disabled={deleting}
            className="btn btn-sm bg-red-700 hover:bg-red-800 text-white flex items-center gap-1"
          >
            <Trash2Icon className="size-4" />
            {deleting ? "Deleting..." : "Delete Note"}
          </button>
        </div>

        {/* Form */}
        <div className="bg-base-100 border border-green-400/20 shadow-lg rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-6 text-green-400">
            📝 Edit Note
          </h2>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold mb-1 text-gray-300">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full input input-bordered bg-base-200 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1 text-gray-300">Content</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full textarea textarea-bordered bg-base-200 text-white h-40 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            <div className="text-right">
              <button
                onClick={handleSave}
                disabled={saving}
                className={`btn bg-green-600 hover:bg-green-700 text-white px-6 ${saving ? "opacity-70 cursor-not-allowed" : ""}`}
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetails;

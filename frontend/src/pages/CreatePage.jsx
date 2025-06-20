import { ArrowLeftIcon } from 'lucide-react';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../lib/axios';

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast.error("Both title and content are required");
      return;
    }

    setLoading(true);
    try {
      await api.post("notes", { title, content });
      toast.success("Note created successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error creating note:", error);
      toast.error("Failed to create note");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-base-200 text-base-content'>
      <div className='max-w-3xl mx-auto px-4 py-12'>

        {/* Back Link */}
        <Link
          to="/"
          className="btn btn-outline border-green-400 text-green-400 hover:bg-green-400 hover:text-black transition duration-200 mb-6"
        >
          <ArrowLeftIcon className="size-4 mr-2" />
          Back to Home
        </Link>

        {/* Card */}
        <div className='bg-base-100 border border-green-400/20 shadow-lg rounded-xl p-8'>
          <h2 className='text-2xl font-bold mb-6 text-green-400'>
            📝 Create New Note
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Title */}
            <div>
              <label className='block text-sm font-semibold mb-1 text-gray-300'>Title</label>
              <input
                type="text"
                placeholder='Note Title'
                className='w-full input input-bordered bg-base-200 text-white focus:outline-none focus:ring-2 focus:ring-green-400'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* Content */}
            <div>
              <label className='block text-sm font-semibold mb-1 text-gray-300'>Content</label>
              <textarea
                placeholder='Write your note here...'
                className='w-full textarea textarea-bordered bg-base-200 text-white h-40 focus:outline-none focus:ring-2 focus:ring-green-400'
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>

            {/* Submit */}
            <div className="text-right">
              <button
                type='submit'
                className={`btn bg-green-600 hover:bg-green-700 text-white px-6 ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
                disabled={loading}
              >
                {loading ? "Creating..." : "Create Note"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;

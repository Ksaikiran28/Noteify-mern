import React from 'react';
import { BanIcon, PlusIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const NotesNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 bg-gray-900 text-gray-300">
      <BanIcon className="size-12 mb-4 text-green-500" />
      <h2 className="text-2xl font-semibold text-white mb-2">No Notes Found</h2>
      <p className="text-sm text-green-300 mb-4">
        Looks like you haven't created any notes yet.
      </p>
      <Link
        to="/create"
        className="btn bg-green-600 hover:bg-green-700 text-white flex items-center gap-2 px-4 py-2 rounded shadow transition"
      >
        <PlusIcon className="size-4" />
        <span>Create One</span>
      </Link>
    </div>
  );
};

export default NotesNotFound;

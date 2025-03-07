import React, { useEffect, useState } from "react";
import { getNotes } from "../services/notesHandling";

interface Note {
  id: string;
  courseName: string;
  description: string;
  file: string;
  title: string;
  type: string;
  unit: string;
}

const NotesView: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const fetchNotes = async () => {
      const fetchedNotes = await getNotes();
      // @ts-ignore
      setNotes(fetchedNotes);
    };

    fetchNotes();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Notes</h1>
        {notes.length === 0 ? (
          <p className="text-center text-gray-500">No notes available</p>
        ) : (
          <ul className="space-y-4">
            {notes.map((note) => (
              <li key={note.id} className="p-4 border rounded-md shadow-sm">
                <h2 className="text-xl font-semibold">{note.title}</h2>
                <p className="mt-2">{note.description}</p>
                <p className="mt-2 text-sm text-gray-600">
                  Course: {note.courseName}
                </p>
                <p className="mt-2 text-sm text-gray-600">Unit: {note.unit}</p>
                <p className="mt-2 text-sm text-gray-600">Type: {note.type}</p>
                <a
                  href={note.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 text-blue-500 hover:underline"
                >
                  View File
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default NotesView;

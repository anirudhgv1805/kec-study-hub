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
  const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const [selectedUnit, setSelectedUnit] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("");

  useEffect(() => {
    const fetchNotes = async () => {
      const fetchedNotes = await getNotes();
      //@ts-ignore
      setNotes(fetchedNotes);
      //@ts-ignore  
      setFilteredNotes(fetchedNotes);
    };

    fetchNotes();
  }, []);

  const handleCourseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const course = e.target.value;
    setSelectedCourse(course);
    filterNotes(course, selectedUnit, selectedType);
  };

  const handleUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const unit = e.target.value;
    setSelectedUnit(unit);
    filterNotes(selectedCourse, unit, selectedType);
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const type = e.target.value;
    setSelectedType(type);
    filterNotes(selectedCourse, selectedUnit, type);
  };

  const filterNotes = (course: string, unit: string, type: string) => {
    let filtered = notes;
    if (course) {
      filtered = filtered.filter((note) => note.courseName === course);
    }
    if (unit) {
      filtered = filtered.filter((note) => note.unit === unit);
    }
    if (type) {
      filtered = filtered.filter((note) => note.type === type);
    }
    setFilteredNotes(filtered);
  };

  const uniqueCourses = Array.from(
    new Set(notes.map((note) => note.courseName))
  );
  const uniqueUnits = Array.from(new Set(notes.map((note) => note.unit)));
  const uniqueTypes = Array.from(new Set(notes.map((note) => note.type)));

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-6">Notes</h1>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Filter by Course:
          </label>
          <select
            value={selectedCourse}
            onChange={handleCourseChange}
            className="mt-1 block w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Courses</option>
            {uniqueCourses.map((course) => (
              <option key={course} value={course}>
                {course}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Filter by Unit:
          </label>
          <select
            value={selectedUnit}
            onChange={handleUnitChange}
            className="mt-1 block w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Units</option>
            {uniqueUnits.map((unit) => (
              <option key={unit} value={unit}>
                {unit}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Filter by Type:
          </label>
          <select
            value={selectedType}
            onChange={handleTypeChange}
            className="mt-1 block w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Types</option>
            {uniqueTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        {filteredNotes.length === 0 ? (
          <p className="text-center text-gray-500">No notes available</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNotes.map((note) => (
              <div
                key={note.id}
                className="bg-white p-4 border rounded-lg shadow-md"
              >
                <h2 className="text-xl font-semibold mb-2">{note.title}</h2>
                <p className="text-gray-700 mb-2">{note.description}</p>
                <p className="text-sm text-gray-600 mb-1">
                  Course: {note.courseName}
                </p>
                <p className="text-sm text-gray-600 mb-1">Unit: {note.unit}</p>
                <p className="text-sm text-gray-600 mb-1">Type: {note.type}</p>
                <div className="flex justify-between items-center mt-2">
                  <a
                    href={note.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    View File
                  </a>
                  <a
                    href={note.file}
                    download
                    className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition"
                  >
                    Download
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotesView;

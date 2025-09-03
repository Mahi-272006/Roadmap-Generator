import React, { useState } from "react";

const Dashboard = () => {
  const [goal, setGoal] = useState("");
  const [skills, setSkills] = useState([""]);
  const [roadmap, setRoadmap] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Add new skill input field
  const addSkillField = () => setSkills([...skills, ""]);

  // Generate roadmap from backend (Flask + Gemini AI)
  const generateRoadmap = async () => {
    setLoading(true);
    setSelectedSkill(null);
    setError(null);

    try {
      const response = await fetch("http://127.0.0.1:5000/generate-roadmap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ goal, skills }),
      });

      if (!response.ok) {
        throw new Error(`Network error: ${response.status}`);
      }

      const data = await response.json();

      // If AI returns string, try parsing JSON
      let roadmapData = [];
      if (typeof data.roadmap === "string") {
        try {
          roadmapData = JSON.parse(data.roadmap);
        } catch {
          roadmapData = []; // fallback empty array if parsing fails
        }
      } else {
        roadmapData = data.roadmap;
      }

      setRoadmap(roadmapData);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to generate roadmap. Make sure your backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>

      {/* Goal Input */}
      <div className="mb-4">
        <label className="block mb-2 text-lg">Your Goal:</label>
        <input
          type="text"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          placeholder="e.g., Become a Data Scientist"
          className="w-full p-2 rounded border border-gray-300 text-black"
        />
      </div>

      {/* Skills Input */}
      <div className="mb-4">
        <label className="block mb-2 text-lg">Skills:</label>
        {skills.map((skill, idx) => (
          <input
            key={idx}
            type="text"
            value={skill}
            onChange={(e) => {
              const newSkills = [...skills];
              newSkills[idx] = e.target.value;
              setSkills(newSkills);
            }}
            placeholder={`Skill ${idx + 1}`}
            className="w-full p-2 rounded border border-gray-300 mb-2 text-black"
          />
        ))}
        <button
          onClick={addSkillField}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          + Add Skill
        </button>
      </div>

      {/* Generate Button */}
      <button
        onClick={generateRoadmap}
        className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition mb-4"
      >
        Generate Roadmap
      </button>

      {/* Loading & Error */}
      {loading && <p className="mb-4">Generating roadmap... ⏳</p>}
      {error && <p className="mb-4 text-red-500">{error}</p>}

      {/* Step-by-Step Skill Cards */}
      <div className="flex flex-wrap gap-4 mb-6">
        {roadmap.map((item, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedSkill(item)}
            className={`cursor-pointer p-4 rounded-lg shadow transition ${
              selectedSkill?.skill === item.skill
                ? "bg-blue-500 text-white"
                : "bg-white dark:bg-gray-800"
            }`}
          >
            {item.skill || "Unnamed Skill"}
          </div>
        ))}
      </div>

      {/* Skill Details */}
      {selectedSkill && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* YouTube */}
          <div>
            <h2 className="font-bold mb-2">YouTube</h2>
            <a
              href={selectedSkill.youtube || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              Watch Video / Playlist
            </a>
          </div>

          {/* Documentation */}
          <div>
            <h2 className="font-bold mb-2">Documentation</h2>
            <a
              href={selectedSkill.docs || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              Read Docs
            </a>
          </div>

          {/* Courses */}
          <div>
            <h2 className="font-bold mb-2">Courses</h2>
            <p>
              Free:{" "}
              <a
                href={selectedSkill?.courses?.free || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                Link
              </a>
            </p>
            <p>
              Paid:{" "}
              <a
                href={selectedSkill?.courses?.paid || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                Link
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

import React, { useState } from "react";

function RoadmapGenerator() {
  const [goal, setGoal] = useState("");
  const [skills, setSkills] = useState("");
  const [roadmap, setRoadmap] = useState([]);

  const handleSubmit = async () => {
    const response = await fetch("http://localhost:5000/generate-roadmap", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ goal, skills }),
    });

    const data = await response.json();
    setRoadmap(data.roadmap);
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Learning Path Generator</h1>
      <input
        type="text"
        placeholder="Your Goal (e.g. software developer)"
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
      />
      <br />
      <input
        type="text"
        placeholder="Current Skills (e.g. html css)"
        value={skills}
        onChange={(e) => setSkills(e.target.value)}
      />
      <br />
      <button onClick={handleSubmit}>Generate Roadmap</button>

      <ul>
        {roadmap.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default RoadmapGenerator;

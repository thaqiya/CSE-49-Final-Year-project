import React, { useState, useEffect } from "react";
import './DisplayMissing.css'

const MissingPeopleDisplay = () => {
  const [missingPeople, setMissingPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMissingPeople = async () => {
      try {
        const response = await fetch(
          "http://localhost:5001/api/missing-people"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch missing people");
        }
        const data = await response.json();
        setMissingPeople(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchMissingPeople();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="missing-people-display">
      <h2>Missing People</h2>
      {missingPeople.length === 0 ? (
        <p>No missing people records found.</p>
      ) : (
        <div className="missing-people-list">
          {missingPeople.map((person) => (
            <div key={person.id} className="missing-person-card">
              <h3>{person.name}</h3>
              <p>
                <strong>Description:</strong> {person.description}
              </p>
              <p>
                <strong>Contact:</strong> {person.phone}
              </p>
              <p>
                <strong>Address:</strong> {person.address}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MissingPeopleDisplay;

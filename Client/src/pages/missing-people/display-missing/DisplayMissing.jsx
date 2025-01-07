import React, { useState, useEffect } from "react";
import "./DisplayMissing.css";
import { API } from "../../../../api";
import Navbar from "../../../components/navbar/Navbar";

const MissingPeopleDisplay = () => {
  const [missingPeople, setMissingPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMissingPeople = async () => {
      try {
        const response = await fetch(`${API}/api/missing-people`);
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
    <div className="display-missing-header">
      <div className="display-missing-container">
        <Navbar/>
        <div className="missing-people-display">
          <h2>Missing People</h2>
          {missingPeople.length === 0 ? (
            <p>No missing people records found.</p>
          ) : (
            <div className="missing-people-list">
              {missingPeople.map((person) => (
                <div key={person.id} className="missing-person-card">
                  <div className="card-image">
                    <img
                      src={person.image_url}
                      alt={person.name}
                      className="missing-person-image"
                    />
                  </div>
                  <div className="card-details">
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
                    <p>
                      <strong>Height:</strong> {person.height}
                    </p>
                    <p>
                      <strong>Weight:</strong> {person.weight}
                    </p>
                    <p>
                      <strong>Sex:</strong> {person.sex}
                    </p>
                    <p>
                      <strong>Race:</strong> {person.race}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MissingPeopleDisplay;

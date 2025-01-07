import React, { useState, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.awesome-markers/dist/leaflet.awesome-markers.css";
import "leaflet.awesome-markers";
import './Location.css';
import Navbar from "../../components/navbar/Navbar";

const Location = () => {
  const [location, setLocation] = useState({ lat: 0, lng: 0 });
  const [reliefCamps, setReliefCamps] = useState([]);
  const [map, setMap] = useState(null);
  const [selectedCamp, setSelectedCamp] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setLocation(userLocation);

        const newMap = L.map("map").setView(
          [userLocation.lat, userLocation.lng],
          13
        );

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "&copy; OpenStreetMap contributors",
        }).addTo(newMap);

        const userIcon = L.AwesomeMarkers.icon({
          icon: "fa-user",
          markerColor: "red",
          prefix: "fa",
        });

        L.marker([userLocation.lat, userLocation.lng], { icon: userIcon })
          .addTo(newMap)
          .bindPopup("You are here")
          .openPopup();

        setMap(newMap);
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }, []);

  console.log(location.lat);
  console.log(location.lng);
  
  

  useEffect(() => {
    if (location.lat !== 0 && location.lng !== 0) {
      const fetchReliefCamps = async () => {
        try {
          const response = await fetch(
            `http://localhost:5000/api/nearby-relief-camps?lat=${location.lat}&lng=${location.lng}`
            
          );
          console.log(response);
          
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          setReliefCamps(data);
        } catch (error) {
          console.error("Error fetching relief camps:", error);
        }
      };

      fetchReliefCamps();
    }
  }, [location]);

  useEffect(() => {
    if (map && reliefCamps.length > 0) {
      reliefCamps.forEach((camp) => {
        const { lat, lon, tags } = camp;
        const name = tags && tags.name ? tags.name : "Relief Camp";

        if (lat && lon) {
          let campIcon = L.AwesomeMarkers.icon({
            icon: "fa-building",
            markerColor: "black",
            prefix: "fa",
          });

          if (tags && tags.amenity === "hospital") {
            campIcon = L.AwesomeMarkers.icon({
              icon: "fa-hospital",
              markerColor: "blue",
              prefix: "fa",
            });
          } else if (tags && tags.amenity === "police") {
            campIcon = L.AwesomeMarkers.icon({
              icon: "fa-shield-alt",
              markerColor: "green",
              prefix: "fa",
            });
          } else if (tags && tags.amenity === "disaster_relieving") {
            campIcon = L.AwesomeMarkers.icon({
              icon: "fa-fire",
              markerColor: "orange",
              prefix: "fa",
            });
          }

          const marker = L.marker([lat, lon], { icon: campIcon })
            .addTo(map)
            .bindPopup(name)
            .bindTooltip(name, { permanent: false, direction: "top" })
            .on("click", () => {
              setSelectedCamp(camp);
              getDirections(camp);
            });

          camp.marker = marker;
        }
      });
    }
  }, [reliefCamps, map]);

  const getDirections = (camp) => {
    if (location && camp) {
      const directionsUrl = `https://www.openstreetmap.org/directions?engine=fossgis_osrm_car&route=${location.lat},${location.lng};${camp.lat},${camp.lon}`;
      window.open(directionsUrl, "_blank");
    }
  };

  return (
        <div className="location location-page">
          {/* Map Section */}
          <div id="map"></div>

          {/* Relief Camp List Section */}
          <div className="relief-camp-list">
            <h3>Nearby Relief Camps</h3>
            <ul>
              {reliefCamps.map((camp, index) => {
                const name =
                  camp.tags && camp.tags.name
                    ? camp.tags.name
                    : "Unnamed Relief Camp";
                return (
                  <li key={index}>
                    <button onClick={() => getDirections(camp)}>{name}</button>
                  </li>
                );
              })}
            </ul>
          </div>
    </div>
  );
};

export default Location;

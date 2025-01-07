import express from "express";

export const router = express.Router();

// Route to fetch nearby relief camps
router.get("/api/location/nearby-relief-camps", async (req, res) => {
  const { lat, lng } = req.query;

  if (!lat || !lng) {
    return res
      .status(400)
      .json({ error: "Latitude and Longitude are required" });
  }

  const query = `
    [out:json];
    (
      node["amenity"="hospital"](around:5000, ${lat}, ${lng});
      node["amenity"="police"](around:5000, ${lat}, ${lng});
      node["amenity"="disaster_relieving"](around:5000, ${lat}, ${lng});
      node["amenity"="ngo"](around:5000, ${lat}, ${lng});
    );
    out body;
  `;

  try {
    // Fetch data from the Overpass API using fetch
    const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(
      query
    )}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Respond with the elements (locations) from the API response
    res.json(data.elements);
  } catch (error) {
    console.error("Error fetching relief camps:", error);
    res.status(500).json({ error: "Error fetching relief camps" });
  }
});

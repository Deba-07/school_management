const db = require("../config/db");

// Haversine distance function
const haversineDistance = (lat1, lon1, lat2, lon2) => {
  const toRad = (angle) => (angle * Math.PI) / 180;
  const R = 6371; // Earth radius in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

exports.addSchool = (req, res) => {
  const { name, address, latitude, longitude } = req.body;

  if (!name || !address || isNaN(latitude) || isNaN(longitude)) {
    return res.status(400).json({ error: "Invalid input data" });
  }

  const sql =
    "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)";
  db.query(sql, [name, address, latitude, longitude], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res
      .status(201)
      .json({ message: "School added successfully", id: result.insertId });
  });
};

exports.listSchools = (req, res) => {
  const { latitude, longitude } = req.query;
  const sql = 'SELECT * FROM schools';

  db.query(sql, (err, schools) => {
    if (err) return res.status(500).json({ error: err.message });

    // Case 1: Latitude & Longitude provided
    if (latitude && longitude) {
      const lat = parseFloat(latitude);
      const lon = parseFloat(longitude);

      if (isNaN(lat) || isNaN(lon)) {
        return res.status(400).json({ error: 'Invalid coordinates' });
      }

      const sortedSchools = schools.map(school => ({
        ...school,
        distance: haversineDistance(lat, lon, school.latitude, school.longitude)
      }))
      .sort((a, b) => a.distance - b.distance);

      return res.json({ count: sortedSchools.length, schools: sortedSchools });
    }

    // Case 2: No coordinates provided – return all schools
    res.json({ count: schools.length, schools });
  });
};
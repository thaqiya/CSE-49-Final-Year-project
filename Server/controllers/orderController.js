import { connection } from "../server.js";

// Create a new order
export const createOrder = async (req, res) => {
  const {
    material_id,
    scan_type,
    latitude,
    longitude,
    bar_code_number,
    user_id,
  } = req.body;
  try {
    const [result] = await connection
      .promise()
      .query(
        "INSERT INTO orders (material_id, scan_type, latitude, longitude, bar_code_number, user_id) VALUES (?, ?, ?, ?, ?, ?)",
        [material_id, scan_type, latitude, longitude, bar_code_number, user_id]
      );
    res.status(200).json({
      id: result.insertId,
      material_id,
      scan_type,
      latitude,
      longitude,
      bar_code_number,
      user_id,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all orders
export const getOrders = async (req, res) => {
  try {
    const [results] = await connection.promise().query("SELECT * FROM orders");
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single order by ID
export const getOrderById = async (req, res) => {
  const { id } = req.params;
  try {
    const [results] = await connection
      .promise()
      .query("SELECT * FROM orders WHERE id = ?", [id]);
    if (results.length === 0) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(results[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update an order by ID
export const updateOrder = async (req, res) => {
  const {
    material_id,
    scan_type,
    latitude,
    longitude,
    bar_code_number,
    user_id,
  } = req.body;

  try {
    await connection
      .promise()
      .query(
        "UPDATE orders SET scan_type = ?, latitude = ?, longitude = ?, user_id = ? WHERE bar_code_number = ?",
        [
          scan_type, // Update scan_type
          latitude, // Update latitude
          longitude, // Update longitude
          user_id, // Update user_id
          bar_code_number, // Update where the barcode matches
        ]
      );
    res.status(200).json({ message: "Order updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Delete an order by ID
export const deleteOrder = async (req, res) => {
  const { id } = req.params;
  try {
    await connection.promise().query("DELETE FROM orders WHERE id = ?", [id]);
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getOrderByUserId = async (req, res) => {
  const { user_id } = req.query;

  if (!user_id) {
    return res.status(400).json({ message: "User ID is required." });
  }

  try {
    const [results] = await connection
      .promise()
      .query("SELECT * FROM orders WHERE user_id = ?", [user_id]);

    if (results.length === 0) {
      return res
        .status(404)
        .json({ message: "No orders found for this user." });
    }

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


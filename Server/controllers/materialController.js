import { connection } from "../server.js";

export const createMaterial = async (req, res) => {
  const { name, quantity, bar_code_number, supplier_id } = req.body;
  try {
    const [result] = await connection.promise().query(
      'INSERT INTO materials (name, quantity, bar_code_number, supplier_id) VALUES (?, ?, ?, ?)',
      [name, quantity, bar_code_number, supplier_id]
    );
    res.status(200).json({ id: result.insertId, name, quantity, bar_code_number, supplier_id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getMaterials = async (req, res) => {
  try {
    const [results] = await connection.promise().query('SELECT * FROM materials');
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getMaterialById = async (req, res) => {
  const { id } = req.params;
  try {
    const [results] = await connection.promise().query('SELECT * FROM materials WHERE id = ?', [id]);
    res.status(200).json(results[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getSupplierByBarcode = async (req, res) => {
  const { barcode } = req.params;
  console.log("Received barcode:", barcode); // Log the barcode to check the value

  try {
    const [result] = await connection
      .promise()
      .query("SELECT * FROM materials WHERE bar_code_number = ?", [barcode]);

    if (result.length > 0) {
      console.log("Material found:", result[0]); // Log the result to see what is returned
      res.status(200).json(result[0]); // Return the material details
    } else {
      console.log("Material not found for barcode:", barcode); // Log when not found
      res.status(404).json({ message: "Material not found" });
    }
  } catch (err) {
    console.error("Error querying the database:", err.message); // Log the error
    res.status(500).json({ message: err.message });
  }
};



export const updateMaterial = async (req, res) => {
  const { id } = req.params;
  const { name, quantity, bar_code_number, supplier_id } = req.body;
  try {
    await connection.promise().query(
      'UPDATE materials SET name = ?, quantity = ?, bar_code_number = ?, supplier_id = ? WHERE id = ?',
      [name, quantity, bar_code_number, supplier_id, id]
    );
    res.status(200).json({ message: 'Material updated successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteMaterial = async (req, res) => {
  const { id } = req.params;
  try {
    await connection.promise().query('DELETE FROM materials WHERE id = ?', [id]);
    res.status(200).json({ message: 'Material deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

import { connection } from "../server.js";

export const createSupplier = async (req, res) => {
  const { name, email, phone, address } = req.body;
  try {
    const [result] = await connection.promise().query(
      'INSERT INTO supplier (name, email, phone, address) VALUES (?, ?, ?, ?)',
      [name, email, phone, address]
    );
    res.status(200).json({ id: result.insertId, name, email, phone, address });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getSuppliers = async (req, res) => {
  try {
    const [results] = await connection.promise().query('SELECT * FROM supplier');
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getSupplierById = async (req, res) => {
  const { id } = req.params;
  try {
    const [results] = await connection.promise().query('SELECT * FROM supplier WHERE id = ?', [id]);
    res.status(200).json(results[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateSupplier = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, address } = req.body;
  try {
    await connection.promise().query(
      'UPDATE supplier SET name = ?, email = ?, phone = ?, address = ? WHERE id = ?',
      [name, email, phone, address, id]
    );
    res.status(200).json({ message: 'Supplier updated successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteSupplier = async (req, res) => {
  const { id } = req.params;
  try {
    await connection.promise().query('DELETE FROM supplier WHERE id = ?', [id]);
    res.status(200).json({ message: 'Supplier deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

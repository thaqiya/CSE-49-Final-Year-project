import { connection } from "../server.js";

export const createMissingPerson = async (req, res) => {
  const { name, description, phone, address } = req.body;
  try {
    const [result] = await connection.promise().query(
      'INSERT INTO missing_people (name, description, phone, address) VALUES (?, ?, ?, ?)',
      [name, description, phone, address]
    );
    res.status(200).json({ id: result.insertId, name, description, phone, address });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getMissingPeople = async (req, res) => {
  try {
    const [results] = await connection.promise().query('SELECT * FROM missing_people');
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getMissingPersonById = async (req, res) => {
  const { id } = req.params;
  try {
    const [results] = await connection.promise().query('SELECT * FROM missing_people WHERE id = ?', [id]);
    res.status(200).json(results[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateMissingPerson = async (req, res) => {
  const { id } = req.params;
  const { name, description, phone, address } = req.body;
  try {
    await connection.promise().query(
      'UPDATE missing_people SET name = ?, description = ?, phone = ?, address = ? WHERE id = ?',
      [name, description, phone, address, id]
    );
    res.status(200).json({ message: 'Missing person updated successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteMissingPerson = async (req, res) => {
  const { id } = req.params;
  try {
    await connection.promise().query('DELETE FROM missing_people WHERE id = ?', [id]);
    res.status(200).json({ message: 'Missing person deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

import  bcrypt from "bcrypt";
import { connection } from "../server.js";
import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config()

const createToken = (_id) => {
  return jsonwebtoken.sign({ _id }, process.env.SECRET, { expiresIn: "7d" });
}

export const createUser = async (req, res) => {
  const { name, email, phone, password, address } = req.body;
  try {

    const [emailExists] = await connection.promise().query(`SELECT * FROM users WHERE email=?`, [email]);
    if (emailExists.length > 0) return res.status(409).json({ message: "Email already exists" });

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const [result] = await connection.promise().query(
      'INSERT INTO users (name, email, phone, password, address) VALUES (?, ?, ?, ?, ?)',
      [name, email, phone, hash, address]
    );

    const token = createToken(result.insertId);

    res.status(200).json({ id: result.insertId, name, email, phone, address, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const [emailExists] = await connection.promise().query(`SELECT * FROM users WHERE email=?`, [email]);
    if (emailExists.length === 0) return res.status(404).json({ message: "User not found" });

    const user = emailExists[0];

    const match = await bcrypt.compare(password, user.password);

    if (!match) return res.status(401).json({ message: "Incorrect Password" });

    const token = createToken(user.id);

    res.status(200).json({ id: user.id, name: user.name, email: user.email, phone: user.phone, address: user.address, token});

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export const getUsers = async (req, res) => {
  try {
    const [results] = await connection.promise().query('SELECT * FROM users');
    const filteredUsers = results.map(user => ({
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address
    }));
    res.status(200).json(filteredUsers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const [results] = await connection.promise().query('SELECT * FROM users WHERE id = ?', [id]);

    const user = results[0];

    const filteredUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address
    }

    res.status(200).json(filteredUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, address } = req.body;
  try {
    await connection.promise().query(
      'UPDATE users SET name = ?, email = ?, phone = ?, address = ? WHERE id = ?',
      [name, email, phone, address, id]
    );
    res.status(200).json({ message: 'User updated successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await connection.promise().query('DELETE FROM users WHERE id = ?', [id]);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

import { connection } from "../server.js";

export const createMissingPerson = async (req, res) => {
  const {
    name,
    description,
    phone,
    address,
    height,
    weight,
    sex,
    race,
    image_url,
  } = req.body;
  try {
    const [result] = await connection.promise().query(
      `INSERT INTO missing_people (name, description, phone, address, height, weight, sex, race, image_url) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [name, description, phone, address, height, weight, sex, race, image_url]
    );
    res.status(200).json({
      id: result.insertId,
      name,
      description,
      phone,
      address,
      height,
      weight,
      sex,
      race,
      image_url,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getMissingPeople = async (req, res) => {
  try {
    const [results] = await connection
      .promise()
      .query("SELECT * FROM missing_people");
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getMissingPersonById = async (req, res) => {
  const { id } = req.params;
  try {
    const [results] = await connection
      .promise()
      .query("SELECT * FROM missing_people WHERE id = ?", [id]);
    res.status(200).json(results[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateMissingPerson = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    description,
    phone,
    address,
    height,
    weight,
    sex,
    race,
    image_url,
  } = req.body;
  try {
    await connection.promise().query(
      `UPDATE missing_people 
       SET name = ?, description = ?, phone = ?, address = ?, height = ?, weight = ?, sex = ?, race = ?, image_url = ? 
       WHERE id = ?`,
      [
        name,
        description,
        phone,
        address,
        height,
        weight,
        sex,
        race,
        image_url,
        id,
      ]
    );
    res.status(200).json({ message: "Missing person updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteMissingPerson = async (req, res) => {
  const { id } = req.params;
  try {
    await connection
      .promise()
      .query("DELETE FROM missing_people WHERE id = ?", [id]);
    res.status(200).json({ message: "Missing person deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const postMissingImage = async(req, res) => {
  try {
    const {
      name,
      description,
      phone,
      address,
      height,
      weight,
      sex,
      race,
      imageUrl,
    } = req.body;

    // Create a new missing person record in the database
    const newPerson = new MissingPeopleModel({
      name,
      description,
      phone,
      address,
      height,
      weight,
      sex,
      race,
      imageUrl, // Save the directLink here
    });

    const savedPerson = await newPerson.save();
    res
      .status(201)
      .json({ message: "Missing person saved successfully", savedPerson });
  } catch (error) {
    console.error("Error saving missing person:", error.message);
    res.status(500).json({ error: "Failed to save missing person" });
  }
}
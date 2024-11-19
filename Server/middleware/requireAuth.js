import jsonwebtoken from "jsonwebtoken";
import { connection } from "../server.js";

export const requireAuth = async (req, res, next) => {

  const { authorization } = req.headers;

  if (!authorization) return res.status(401).json({ error: "Authorization token required" });

  const token = authorization.split(" ")[1];

  try {
    const { _id } = jsonwebtoken.verify(token, process.env.SECRET);

    const [rows] = await connection.promise().query('SELECT id FROM users WHERE id = ?', [_id]);

    if (rows.length === 0) {
      return res.status(401).json({ error: "Request is not authorized 1" });
    }

    req.user = { id: rows[0].id };

    next();

  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Request is not authorized 2" });
  }
};

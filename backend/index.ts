import express from "express";
const app = express();
import cors from "cors";
import pool from "./db";
import {config} from "dotenv";

config();

app.use(
  cors({
    origin: [process.env.REACT_APP_FRONTEND_URL || ""],
  })
);

app.use(express.json());

const port = process.env.PORT || 8080;

pool.query("DELETE FROM users WHERE email = $1", ["ivanushka@gmail.com"]);
pool.query("DELETE FROM users WHERE email = $1", ["alexeiisgrogrammer@gmail.com"]);
pool.query("DELETE FROM users WHERE email = $1", ["V1ADD@mail.ru"]);

pool.query("INSERT INTO users (name, email, password, role, status) VALUES($1, $2, $3, 'user', 'active') RETURNING *", ["Ivan", "ivanushka@gmail.com", "qwerty12345"]);
pool.query("INSERT INTO users (name, email, password, role, status) VALUES($1, $2, $3, 'admin', 'blocked') RETURNING *", ["Alex", "alexeiisgrogrammer@gmail.com", "Aboba2000"]);
pool.query("INSERT INTO users (name, email, password, role, status) VALUES($1, $2, $3, 'admin', 'active') RETURNING *", ["Vlad", "V1ADD@mail.ru", "chips"]);

app.post("/users", async (req, res) => {
  try {
    const {name, email, password, repeatPassword} = req.body;

    if (password !== repeatPassword) {
      res.status(408).json({message: "Passwords must match"});
      return;
    }

    const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

    if (user.rowCount !== 0) {
      res.status(405).json({message: "User with this email already exists"});
      return;
    }

    const newUser = await pool.query("INSERT INTO users (name, email, password, role, status) VALUES($1, $2, $3, 'user', 'active') RETURNING *", [name, email, password]);

    res.json(newUser.rows[0]);
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
      console.log(err.message);

      res.status(500).json({message: "Server error"});
    }
  }
});

app.get("/users", async (req, res) => {
  try {
    const allUsers = await pool.query("SELECT * FROM users ORDER BY id ASC");
    const formattedUsers = allUsers.rows.map((user) => {
      const formattedUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        status: user.status,
        role: user.role,
      };

      return formattedUser;
    });

    res.json(formattedUsers);
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
      res.status(500).json({message: "Server error"});
    }
  }
});

app.get("/users/:id", async (req, res) => {
  try {
    const {id} = req.params;

    const user = await pool.query("SELECT * FROM users WHERE id = $1", [id]);

    if (user.rowCount === 0) {
      res.status(405).json({message: "User doesn't exists"});
      return;
    }

    res.json(user.rows[0]);
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
      res.status(500).json({message: "Server error"});
    }
  }
});

app.post("/users/login", async (req, res) => {
  try {
    const {password, email} = req.body;
    const user = await pool.query("SELECT * FROM users WHERE email = $1 and password = $2", [email, password]);

    if (user.rowCount === 0) {
      res.status(404).json({message: "Email or password wrong"});
      return;
    }

    const selectedUser = user.rows[0];
    const formattedUser = {
      id: selectedUser.id,
      name: selectedUser.name,
      email: selectedUser.email,
      status: selectedUser.status,
      role: selectedUser.role,
    };

    res.json(formattedUser);
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
      res.status(500).json({message: "Server error"});
    }
  }
});

app.patch("/users", async (req, res) => {
  try {
    const {actions} = req.body;

    const actionsPromises = actions.map(
      ({field, id, value}: {field: string; id: number; value: string}) =>
        new Promise((resolve, reject) => {
          pool.query(`UPDATE users SET ${field} = $1 WHERE id = $2`, [value, id]).then(resolve).catch(reject);
        })
    );

    await Promise.all(actionsPromises);

    res.status(200).json({message: "Success changing"});
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
      res.status(500).json({message: "Server error"});
    }
  }
});

app.delete("/users", async (req, res) => {
  try {
    const {ids} = req.body;

    const actionsPromises = ids.map(
      (id: number) =>
        new Promise((resolve, reject) => {
          pool.query("DELETE FROM users WHERE id = $1", [id]).then(resolve).catch(reject);
        })
    );

    await Promise.all(actionsPromises);

    res.status(200).json({message: "Success deleting"});
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
      res.status(500).json({message: "Server error"});
    }
  }
});

app.listen(port, () => {
  console.log(`Server has started on port ${port}`);
});

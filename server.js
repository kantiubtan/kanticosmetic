const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const DB_PATH = path.join(__dirname, "customers.db.json");

app.use(express.json());
app.use(express.static(__dirname));

function readDb() {
  try {
    return JSON.parse(fs.readFileSync(DB_PATH, "utf8"));
  } catch {
    return { users: [] };
  }
}

function writeDb(db) {
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2));
}

app.post("/api/register", (req, res) => {
  const db = readDb();
  const user = req.body || {};
  if (!user.username || !user.password || !user.email) return res.status(400).json({ error: "Missing required fields." });
  const username = String(user.username).toLowerCase();
  const idx = db.users.findIndex((u) => u.username === username);
  if (idx >= 0 && db.users[idx].password !== user.password) return res.status(409).json({ error: "Username already exists." });
  const merged = { ...db.users[idx], ...user, username };
  if (idx >= 0) db.users[idx] = merged;
  else db.users.push(merged);
  writeDb(db);
  res.json({ ok: true, user: merged });
});

app.post("/api/login", (req, res) => {
  const db = readDb();
  const username = String(req.body?.username || "").toLowerCase();
  const password = String(req.body?.password || "");
  const user = db.users.find((u) => u.username === username || u.email === username);
  if (!user) return res.status(404).json({ error: "Account not found." });
  if (user.password !== password) return res.status(401).json({ error: "Incorrect password." });
  res.json({ ok: true, user });
});

app.get("/api/users", (_req, res) => {
  const db = readDb();
  res.json({ ok: true, users: db.users });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

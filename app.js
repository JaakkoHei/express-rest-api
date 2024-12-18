const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const path = require("path");

let counter = 3;

let db = [
  { id: 1, latitude: 1, longitude: 1 },
  { id: 2, latitude: 2, longitude: 2 },
];

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/locations", (req, res) => {
  res.json(db);
});

app.get("/api/locations/:urlId([0-9]+)", (req, res) => {
  const id = Number(req.params.urlId);
  const temp = db.find((customer) => customer.id === id);
  temp ? res.json(temp) : res.status(404).end();
});

app.post("/api/locations", (req, res) => {
  const customer = req.body;
  customer.id = counter++;
  db.push(customer);
  res.status(201).json(customer);
});

app.delete("/api/locations/:urlId([0-9]+)", (req, res) => {
  const id = Number(req.params.urlId);
  db = db.filter((customer) => customer.id !== id);
  res.status(204).end();
});

const server = app.listen(port, () => {
  console.log(`My app listening on port ${port}`);
});

process.on("SIGINT", () => {
  console.log("Gracefully shutting down Express.js server...");
  server.close(() => {
    console.log("Server closed.");
    process.exit(0);
  });
});

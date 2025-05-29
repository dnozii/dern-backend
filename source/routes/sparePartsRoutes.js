const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

const PARTS_FILE = path.join(__dirname, '../../databases/spareParts.json');

// GET all spare parts
router.get('/', (req, res) => {
  const data = fs.readFileSync(PARTS_FILE);
  const parts = JSON.parse(data);
  res.json(parts);
});

// POST add new part
router.post('/', (req, res) => {
  const { name, quantity, price, status } = req.body;
  const data = fs.readFileSync(PARTS_FILE);
  const parts = JSON.parse(data);

  const newPart = {
    id: Date.now(),
    name,
    quantity,
    price,
    status
  };

  parts.push(newPart);
  fs.writeFileSync(PARTS_FILE, JSON.stringify(parts, null, 2));
  res.status(201).json(newPart);
});

// PUT update part
router.put('/:id', (req, res) => {
  const partId = parseInt(req.params.id);
  const updated = req.body;
  const data = fs.readFileSync(PARTS_FILE);
  let parts = JSON.parse(data);

  parts = parts.map(part => part.id === partId ? { ...part, ...updated } : part);
  fs.writeFileSync(PARTS_FILE, JSON.stringify(parts, null, 2));
  res.json({ success: true });
});

// DELETE part
router.delete('/:id', (req, res) => {
  const partId = parseInt(req.params.id);
  const data = fs.readFileSync(PARTS_FILE);
  const parts = JSON.parse(data).filter(part => part.id !== partId);

  fs.writeFileSync(PARTS_FILE, JSON.stringify(parts, null, 2));
  res.json({ success: true });
});

module.exports = router;

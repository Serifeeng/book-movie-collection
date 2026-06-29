const itemService = require('../services/itemService');

const getItems = async (req, res) => {
  try {
    const data = await itemService.getItems(req.user._id, req.query);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getItem = async (req, res) => {
  try {
    const item = await itemService.getItemById(req.user._id, req.params.id);
    res.status(200).json(item);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const createItem = async (req, res) => {
  try {
    const item = await itemService.createItem(req.user._id, req.body);
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateItem = async (req, res) => {
  try {
    const item = await itemService.updateItem(req.user._id, req.params.id, req.body);
    res.status(200).json(item);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteItem = async (req, res) => {
  try {
    const result = await itemService.deleteItem(req.user._id, req.params.id);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getStats = async (req, res) => {
  try {
    const stats = await itemService.getStats(req.user._id);
    res.status(200).json(stats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
  getStats
};

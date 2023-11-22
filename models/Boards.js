const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const boardsController = require("../controllers/boardsController");

const boardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
// router.post("/", boardsController.createBoard);

module.exports = mongoose.model("Board", boardSchema);

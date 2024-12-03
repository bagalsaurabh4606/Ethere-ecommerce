const { required, string, number } = require("joi");
const { default: mongoose } = require("mongoose");
const express = require("mongoose");

const addtoBagSchema = new mongoose.Schema(
  {
    id: Number,
    userId: String,
    quantity: Number,
  },
  { timestamps: true }
);

const addtoBagModel = mongoose.model("addToBag", addtoBagSchema);

module.exports = addtoBagModel;

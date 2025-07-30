const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// گرفتن همه محصولات
router.get('/', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// افزودن محصول جدید
router.post('/', async (req, res) => {
  const newProduct = new Product(req.body);
  const saved = await newProduct.save();
  res.status(201).json(saved);
});

// حذف یک محصول
router.delete('/:id', async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

// ویرایش محصول
router.put('/:id', async (req, res) => {
  const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

module.exports = router;

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Product = require('./models/Product');

const app = express();
app.use(bodyParser.json());

// ✅ Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/productDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB Connected'))
.catch(err => console.error('❌ Connection Error:', err));


// 🟢 CREATE a new product
app.post('/products', async (req, res) => {
    try {
        const { name, price, category } = req.body;
        const newProduct = new Product({ name, price, category });
        await newProduct.save();
        res.status(201).json({ message: 'Product added successfully', newProduct });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// 🔵 READ all products
app.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 🟣 UPDATE a product by ID
app.put('/products/:id', async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });
        res.json({ message: 'Product updated successfully', updatedProduct });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// 🔴 DELETE a product by ID
app.delete('/products/:id', async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) return res.status(404).json({ message: 'Product not found' });
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// 🌐 Start Server
app.listen(3000, () => {
    console.log('🚀 Server running at http://localhost:3000');
});

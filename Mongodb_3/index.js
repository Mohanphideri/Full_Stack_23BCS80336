// 1. Import mongoose
const mongoose = require('mongoose');

// 2. Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/ecommerce', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// 3. Define nested schemas
const variantSchema = new mongoose.Schema({
    color: String,
    size: String,
    stock: Number
});

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    category: String,
    variants: [variantSchema]
});

const Product = mongoose.model('Product', productSchema);

// 4. Insert sample products
async function insertSampleProducts() {
    const products = [
        {
            name: "T-Shirt",
            price: 499,
            category: "Clothing",
            variants: [
                { color: "Red", size: "M", stock: 10 },
                { color: "Blue", size: "L", stock: 5 }
            ]
        },
        {
            name: "Sneakers",
            price: 2999,
            category: "Footwear",
            variants: [
                { color: "White", size: "42", stock: 7 },
                { color: "Black", size: "41", stock: 3 }
            ]
        },
        {
            name: "Laptop Bag",
            price: 1999,
            category: "Accessories",
            variants: [
                { color: "Gray", size: "15 inch", stock: 20 },
                { color: "Black", size: "17 inch", stock: 15 }
            ]
        }
    ];

    await Product.insertMany(products);
    console.log("Sample products inserted!");
}

// 5. Fetch all products
async function getAllProducts() {
    const products = await Product.find();
    console.log(products);
}

// 6. Fetch products by category
async function getProductsByCategory(category) {
    const products = await Product.find({ category });
    console.log(products);
}

// 7. Fetch product name & variants only
async function getProductVariants() {
    const products = await Product.find({}, { name: 1, variants: 1, _id: 0 });
    console.log(products);
}

// Run functions sequentially
async function run() {
    await insertSampleProducts();
    await getAllProducts();
    await getProductsByCategory("Footwear");
    await getProductVariants();
}

run();

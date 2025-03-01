// const Product = require('../models/productModel');
// const cloudinary = require('cloudinary').v2;
// const multer = require('multer');
// const { Readable } = require('stream');

// // Configure Cloudinary
// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_SECRET_KEY
// });

// // Configure Multer for file upload
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

// // Function to upload buffer to Cloudinary
// const uploadFromBuffer = (buffer) => {
//     return new Promise((resolve, reject) => {
//         const uploadStream = cloudinary.uploader.upload_stream(
//             { folder: 'flower-shop' },
//             (error, result) => {
//                 if (error) return reject(error);
//                 resolve(result);
//             }
//         );

//         const readableStream = new Readable({
//             read() {
//                 this.push(buffer);
//                 this.push(null);
//             }
//         });

//         readableStream.pipe(uploadStream);
//     });
// };

// // Middleware array for adding products
// exports.addProduct = [
//     upload.single('productImage'),
//     async (req, res) => {
//         try {
//             const { name, description, price, category, stockQuantity } = req.body;

//             if (!req.file) {
//                 return res.status(400).json({ message: 'No image file provided' });
//             }

//             // Upload image buffer to Cloudinary
//             const result = await uploadFromBuffer(req.file.buffer);
//             const imageUrl = result.secure_url;

//             const product = await Product.create({
//                 name,
//                 description,
//                 price: parseFloat(price),
//                 image: imageUrl,
//                 category,
//                 stockQuantity: parseInt(stockQuantity)
//             });

//             res.status(201).json({ message: 'Product added successfully', product });
//         } catch (error) {
//             console.error('Error adding product:', error);
//             res.status(500).json({ message: 'Error adding product', error: error.message });
//         }
//     }
// ];

// exports.getProducts = async (req, res) => {
//     try {
//         const products = await Product.findAll();
//         res.status(200).json(products);
//     } catch (error) {
//         res.status(500).json({ message: 'Error fetching products', error: error.message });
//     }
// };

const Product = require('../models/productModel');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { Readable } = require('stream');

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY
});

// Configure Multer for file upload
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Function to upload buffer to Cloudinary
const uploadFromBuffer = (buffer) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            { folder: 'flower-shop' },
            (error, result) => {
                if (error) return reject(error);
                resolve(result);
            }
        );

        const readableStream = new Readable({
            read() {
                this.push(buffer);
                this.push(null);
            }
        });

        readableStream.pipe(uploadStream);
    });
};

// Middleware array for adding products
exports.addProduct = [
    upload.single('productImage'),
    async (req, res) => {
        try {
            const { name, description, price, category, stockQuantity } = req.body;

            if (!req.file) {
                return res.status(400).json({ message: 'No image file provided' });
            }

            const result = await uploadFromBuffer(req.file.buffer);
            const imageUrl = result.secure_url;

            const product = await Product.create({
                name,
                description,
                price: parseFloat(price),
                image: imageUrl,
                category,
                stockQuantity: parseInt(stockQuantity)
            });

            res.status(201).json({ message: 'Product added successfully', product });
        } catch (error) {
            console.error('Error adding product:', error);
            res.status(500).json({ message: 'Error adding product', error: error.message });
        }
    }
];

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error: error.message });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching product', error: error.message });
    }
};
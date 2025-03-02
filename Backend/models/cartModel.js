const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Product = require('./productModel');
const User = require('./userModel'); // Assuming userModel.js exists

const Cart = sequelize.define('Cart', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'Users', key: 'id' }
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'Products', key: 'id' }
    },
    userName: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Default User' // Add this line
    },
    productName: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Default Product' // Add this line
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    addedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    timestamps: false
});

Cart.belongsTo(Product, { foreignKey: 'productId' });
Cart.belongsTo(User, { foreignKey: 'userId' }); // Add association for userName

module.exports = Cart;
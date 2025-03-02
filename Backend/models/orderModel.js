const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Product = require('./productModel');
const User = require('./userModel'); // Assuming userModel.js exists

const Order = sequelize.define('Order', {
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
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    contact: {
        type: DataTypes.STRING,
        allowNull: false
    },
    paymentMethod: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Pending'
    },
    orderDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    reviewed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    timestamps: false
});

Order.belongsTo(Product, { foreignKey: 'productId' });
Order.belongsTo(User, { foreignKey: 'userId' }); // Add association for userName

module.exports = Order;
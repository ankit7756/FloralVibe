const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Product = require('./productModel');

const Wishlist = sequelize.define('Wishlist', {
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
    addedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    timestamps: false
});

Wishlist.belongsTo(Product, { foreignKey: 'productId' });

module.exports = Wishlist;
const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter Product Name:"],
        },
        quantity: {
            type: Number,
            required: [true, "Please enter Product Quantity:"],
            default: 0,
        },
        price: {
            type: Number,
            required: [true, "Please enter Product Price:"],
            default: 0,
        },
        image: {
            type: String,
            required: [false, "Please enter Product Image:"],
        },
        //add timestamp for created and updated
        created_at: {
            type: Date,
            default: Date.now
        },
        updated_at: {
            type: Date,
            default: Date.now
        }
    },

    {
        timestamp: true,
    }
);

const Product= mongoose.model("Product", ProductSchema);

module.exports=Product;

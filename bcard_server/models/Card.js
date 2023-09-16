const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: 2
    },
    subtitle: {
        type: String,
        required: true,
        minLength: 2
    },
    description: {
        type: String,
        required: true,
        minLength: 2
    },
    phone: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 13
    },
    email: {
        type: String,
        required: true
    },
    web: {
        type: String
    },
    image: {
        url: {
            type: String
        },
        alt: {
            type: String
        }
    },
    address: {
        state: {
            type: String
        },
        country: {
            type: String,
            required: true,
            minLength: 2
        },
        city: {
            type: String,
            required: true,
            minLength: 2
        },
        street: {
            type: String,
            required: true,
            minLength: 2
        },
        houseNumber: {
            type: Number,
            required: true
        },
        zip: {
            type: String
        }
    },
    bizNumber: {
        type: Number
    },
    createdAt: {
        type: Date
    },
    userId: {
        type: String
    },
    favoriteByUsers: {
        type: Array
    }
});

const Card = mongoose.model("cards", cardSchema);

module.exports = Card;
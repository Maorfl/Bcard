const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        first: {
            type: String,
            required: true,
            minLength: 2
        },
        middle: {
            type: String
        },
        last: {
            type: String,
            required: true,
            minLength: 2
        }
    },
    phone: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 13
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: false,
        minLength: 8
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
    image: {
        url: {
            type: String
        },
        alt: {
            type: String
        }
    },
    gender: {
        type: String
    },
    userType: {
        type: String
    },
    suspended: {
        type: Date
    }
});

const User = mongoose.model("users", userSchema);

module.exports = User;
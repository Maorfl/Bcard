const express = require("express");
const joi = require("joi");
const _ = require("lodash");
const auth = require("../middlewares/auth");
const Card = require("../models/Card");

const router = express.Router();

const bizNumberSchema = joi.object({
    bizNumber: joi.number()
});

const cardJoiSchema = joi.object({
    title: joi.string().required().min(2),
    subtitle: joi.string().required().min(2),
    description: joi.string().required().min(2),
    phone: joi.string().required().min(4).max(13),
    email: joi.string().required().email(),
    web: joi.string().allow(''),
    image: {
        url: joi.string().allow(''),
        alt: joi.string().allow('')
    },
    address: {
        state: joi.string().allow(''),
        country: joi.string().required().min(2),
        city: joi.string().required().min(2),
        street: joi.string().required().min(2),
        houseNumber: joi.number().required().min(0),
        zip: joi.string().allow('')
    },
    userId: joi.string(),
    favoriteByUsers: joi.array()
});


router.get("/", async (req, res) => {
    try {
        let cards = await Card.find();
        if (!cards) return res.status(404).send("No cards available!");

        res.status(200).send(cards);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get("/my-cards", auth, async (req, res) => {
    try {
        let cards = await Card.find({ _id: req.payload._id });
        if (!cards) return res.status(404).send("No cards available!");

        cards = _.map(cards, (card) => _.pick(card, ["_id", "title", "subtitle", "description", "phone", "email", "web", "image", "address", "bizNumber"]));

        res.status(200).send(cards);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get("/:id", async (req, res) => {
    try {
        let card = await Card.findById(req.params.id);
        if (!card) return res.status(404).send("Card does not exist!");

        res.status(200).send(_.pick(card, ["_id", "title", "subtitle", "description", "phone", "email", "web", "image", "address", "bizNumber"]));
    } catch (error) {
        res.status(400).send(error);
    }
});

router.post("/", auth, async (req, res) => {
    try {
        const { error } = cardJoiSchema.validate(req.body);
        if (error) return res.status(400).send(error);

        let bizNumber = Math.floor((Math.random() * 9999999 - 1000000) + 1000000);
        let createdAt = Date.now();

        let card = new Card({ ...req.body, bizNumber: bizNumber, createdAt: createdAt });
        await card.save();

        res.status(201).send(card);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.put("/:id", auth, async (req, res) => {
    try {
        const { error } = cardJoiSchema.validate(req.body);
        if (error) return res.status(400).send(error);

        let card = await Card.findOneAndUpdate(
            {
                _id: req.params.id
            },
            req.body,
            { new: true }
        );

        if (!card) return res.status(404).send("Card does not exist!");

        res.status(200).send(card);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.patch("/:id", auth, async (req, res) => {
    try {
        let card = await Card.findOne({ _id: req.params.id });
        if (!card) return res.status(404).send("Card does not exist!");

        const { error } = bizNumberSchema.validate(req.body);
        if (!error) {
            let cards = await Card.find();
            if (cards.find((card) => card.bizNumber == req.body.bizNumber)) return res.send("Biz-Number already exists!");
            else card.bizNumber = req.body.bizNumber;
        }
        else {
            if (card.favoriteByUsers.includes(req.payload._id))
                card.favoriteByUsers.splice(card.favoriteByUsers.findIndex((userId) => userId == req.payload._id), 1);
            else
                card.favoriteByUsers.push(req.payload._id);
        }
        await card.save();

        res.status(200).send(card);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete("/:id", auth, async (req, res) => {
    try {
        let card = await Card.findOneAndDelete({ _id: req.params.id });
        if (!card) return res.status(404).send("Card does not exist!");

        res.status(200).send(card);
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;
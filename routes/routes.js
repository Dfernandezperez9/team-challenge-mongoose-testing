const EXPRESS = require("express");
const ROUTER = EXPRESS.Router();
const IMPORT_POST = require("../models/post.js");
const MONGOOSE = require("mongoose");
const { POST, POST_VALIDATION_SCHEMA } = require('../models/post');

ROUTER.get("/", async (req, res) => {
    try {
        const POSTS = await POST.find();
        res.status(200).send(POSTS);
    } catch (error) {
        res.status(500).send({ message: "Hubo un problema al obtener los posts" });
    }
});
  
ROUTER.get("/id/:_id", async (req, res) => {
    try {
        const NEW_POST = await POST.findById(req.params._id);
        if (!POST) {
            res.status(404).send({ message: "Post no encontrado" });
        } else {
            res.status(200).send(NEW_POST);
        }
    } catch (error) {
        res.status(500).send({ message: "Hubo un problema al obtener el post" });
    }
});
  
ROUTER.get("/title/:title", async (req, res) => {
    try {
        const NEW_POST = await POST.findOne({ title: req.params.title });
        if (!POST) {
            res.status(404).send({ message: "Post no encontrado" });
        } else {
            res.status(200).send(NEW_POST);
        }
    } catch (error) {
        res.status(500).send({ message: "Hubo un problema al obtener el post" });
    }
});
  
ROUTER.put("/id/:_id", async (req, res) => {
    try {
        const NEW_POST = await POST.findByIdAndUpdate(req.params._id, { title: req.body.title, body: req.body.body }, { new: true });
        if (!NEW_POST) {
            res.status(404).send({ message: "Post no encontrado" });
        } else {
            res.status(200).send(NEW_POST);
        }
    } catch (error) {
        res.status(500).send({ message: "Hubo un problema al actualizar el post" });
    }
});
  
ROUTER.delete("/id/:_id", async (req, res) => {
    try {
        const ID = new MONGOOSE.Types.ObjectId(req.params._id);
        const NEW_POST = await POST.findByIdAndDelete(ID);
        if (!NEW_POST) {
            res.status(404).send({ message: "Post no encontrado" });
        } else {
            res.status(200).send({ message: "Post eliminado con éxito" });
        }
    } catch (error) {
        res.status(500).send({ message: "Hubo un problema al eliminar el post" });
    }
});

ROUTER.post("/create", async (req, res) => {
  try {
    const { error } = POST_VALIDATION_SCHEMA.validate(req.body);
    if (error) {
      res.status(400).send({ message: "Datos inválidos", error: error.details });
      return;
    }

    const NEW_POST = new POST(req.body);
    await NEW_POST.save();
    res.status(201).send(NEW_POST);
  } catch (error) {
    res.status(500).send({ message: "Hubo un problema al crear el post" });
  }
});

ROUTER.get("/postsWithPagination", async (req, res) => {
    try {
      const { page, limit } = req.query;
      const pageNumber = parseInt(page) || 1;
      const limitNumber = parseInt(limit) || 1;
  
      const POSTS = await POST.find().skip((pageNumber - 1) * limitNumber).limit(limitNumber);
  
      res.status(200).send({
        posts: POSTS,
      });
    } catch (error) {
      res.status(500).send({ message: "Hubo un problema al obtener los posts" });
    }
  });

  // GET /postsWithPagination?page=2&limit=1

module.exports = ROUTER;
const express = require("express");

const ctrl = require("../../controllers/contacts");

const { auth } = require("../../middlewares");

const { ctrlWrapper } = require("../../helpers");

const router = express.Router();

router.get("/", auth, ctrlWrapper(ctrl.getAll));

router.get("/:id", auth, ctrlWrapper(ctrl.getById));

router.post("/", auth, ctrlWrapper(ctrl.addContact));

router.put("/:id", auth, ctrlWrapper(ctrl.updateById));

router.patch("/:id/favorite", auth, ctrlWrapper(ctrl.updateFavorite));

router.delete("/:id", auth, ctrlWrapper(ctrl.deleteContact));

module.exports = router;

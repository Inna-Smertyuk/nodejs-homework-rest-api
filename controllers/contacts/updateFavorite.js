const { Contact, schemas } = require("../../models/contacts");

const { createError } = require("../../helpers");

const updateFavorite = async (req, res) => {
  const { error } = schemas.updateFavorite.validate(req.body);
  if (error) {
    throw createError(400, "missing field favorite");
  }
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw createError(404);
  }
  res.json(result);
};

module.exports = updateFavorite;

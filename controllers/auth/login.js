const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User, schemas } = require("../../models/user");
const { createError } = require("../../helpers");
const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { error } = schemas.login.validate(req.body);
  if (error) {
    throw createError(400, error.message);
  }
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw createError(401, "Email wrong");
  }
  const comparePassword = await bcrypt.compare(password, user.password);
  if (!comparePassword) {
    throw createError(401, "Password wrong");
  }

  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });
  await User.findByIdAndUpdate(user._id, { token });
  res.status(200).json({
    token,
    user: {
      email: user.email,
      subscription: "starter",
    },
  });
};

module.exports = login;

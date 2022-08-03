const ctrlWrapper = (ctrl) => {
  const errorFunc = async (req, res, next) => {
    try {
      await ctrl(req, res, next);
    } catch (error) {
      next(error);
    }
  };

  return errorFunc;
};

module.exports = ctrlWrapper;

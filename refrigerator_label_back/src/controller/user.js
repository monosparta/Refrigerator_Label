const user_service = require("../services/user.js");

const user_update = async (_req, res) => {
  try {
    await user_service.user_update();
    return res.status(200).json({ message: "Update successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  user_update,
};

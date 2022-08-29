const user_service = require("../services/user.js");

const find_user_all = async (_req, res) => {
  try {
    const users = await user_service.select_user_all();
    return res.status(200).json({ message: users });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  find_user_all,
};

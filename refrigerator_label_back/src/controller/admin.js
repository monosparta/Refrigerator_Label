const admin_service = require("../services/admin.js");
const bcrypt = require("bcrypt");
const form_verification = require("../services/form_verification.js");

const login = async (req, res) => {
  try {
    const admin = await admin_service.is_admin(req.body);
    if (admin && bcrypt.compareSync(req.body.password, admin.password)) {
      const token = await admin_service.token_create(admin);
      return res
        .status(201)
        .json({ message: "Login successfully", token: token , username: admin.username});
    } else {
      return res.status(401).json({ message: "Username or Password error" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const find_admin_all = async (_req, res) => {
  try {
    const admins = await admin_service.find_admin_all();
    return res.status(200).json({ message: admins });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const admin_create = async (req, res) => {
  try {
    if (!req.body.username || !req.body.password || !req.body.mail) {
      return res.status(403).json({ message: "Information missing" });
    }
    const admin = await admin_service.is_admin(req.body);
    if (!admin) {
      const mail_verification = await form_verification.is_mail(req.body.mail);
      if (!mail_verification) {
        return res.status(402).json({ message: "Email error" });
      }
      const admin_create = await admin_service.admin_create(req.body);

      if (admin_create) {
        return res.status(201).json({ message: "Admin create successfully" });
      } else {
        return res.status(417).json({ message: "Failed to execute" });
      }
    } else {
      return res.status(403).json({ message: "Username already exists" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const admin_delete = async (req, res) => {
  try {
    if (!req.body.username) {
      return res.status(403).json({ message: "Information missing" });
    }
    const admin = await admin_service.is_admin(req.body);
    const admins = await admin_service.find_admin_all();
    if (admin && admins.length >= 2) {
      await admin_service.admin_delete(req.body.username);
      return res.status(200).json({ message: "Account delete successfully" });
    } else if (admins.length < 2) {
      return res.status(401).json({ message: "At least one account exists" });
    } else {
      return res.status(404).json({ message: "Account does not exist" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const reset_password = async (req, res) => {
  try {
    if (!req.body.username) {
      return res.status(403).json({ message: "Information missing" });
    }
    if (req.decoded.username !== req.body.username) {
      return res.status(401).json({ message: "Can only reset your own account" });
    }
    const admin = await admin_service.is_admin(req.body);
    if (admin) {
      const reset_password = admin_service.reset_password(req.body);
      if (reset_password) {
        return res
          .status(201)
          .json({ message: "Password reseted successfully" });
      } else {
        return res.status(417).json({ message: "Failed to execute" });
      }
    } else {
      return res.status(403).json({ message: "Account error" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  login,
  find_admin_all,
  admin_create,
  admin_delete,
  reset_password,
};

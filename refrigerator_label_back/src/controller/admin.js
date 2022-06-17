const admin_service = require("../services/admin.js");
const bcrypt = require("bcrypt");
const form_verification = require("../services/form_verification.js");

login = async (req, res) => {
  try {
    const admin = await admin_service.is_admin(req.body);
    if (admin && bcrypt.compareSync(req.body.password, admin.password)) {
      const token = await admin_service.token_create(admin);
      return res.status(201).json({ message: "登入成功", token: token });
    } else {
      return res.status(401).json({ message: "帳號或密碼錯誤" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

find_admin_all = async (req, res) => {
  try {
    const admins = await admin_service.find_admin_all();
    return res.status(200).json({ message: admins });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

admin_create = async (req, res) => {
  try {
    const admin = await admin_service.is_admin(req.body);
    if (!admin) {
      const mail_verification = await form_verification.is_mail(req.body.mail);
      if (!mail_verification) {
        return res.status(403).json({ message: "Email錯誤" });
      }
      const admin_create = await admin_service.admin_create(req.body);

      if (admin_create) {
        const token = await admin_service.token_create(admin_create);
        return res
          .status(201)
          .json({ message: "管理帳號新增成功", token: token });
      } else {
        return res.status(402).json({ message: "管理帳號新增錯誤" });
      }
    } else {
      return res.status(401).json({ message: "管理帳號重複" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

admin_delete = async (req, res) => {
  try {
    const admin = await admin_service.is_admin(req.body);
    if (admin && bcrypt.compareSync(req.body.password, admin.password)) {
      await admin_service.admin_delete(req.body.username);
      return res.status(201).json({ message: "管理帳號刪除成功" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

reset_password = async (req, res) => {
  try {
    const admin = await admin_service.is_admin(req.body);
    if (admin) {
      const reset_password = admin_service.reset_password(req.body);
      if (reset_password) {
        return res.status(201).json({ message: "密碼修改成功" });
      } else {
        return res.status(402).json({ message: "密碼修改錯誤" });
      }
    } else {
      return res.status(401).json({ message: "帳號錯誤" });
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

const token_authentication_middleware = require("../middleware/token_authentication");
const user_controller = require("../controller/user.js");
const label_controller = require("../controller/label.js");
const admin_controller = require("../controller/admin.js");
const mail_controller = require("../controller/mail.js");

module.exports = function (router) {
  router.get("/", (req, res) => {
    res.send("Hello World!");
  });

  router.post("/api/login", admin_controller.login);

  router.use(token_authentication_middleware);
  
  router.get("/api/find_user_all", user_controller.find_user_all);

  router.get("/api/find_label_all", label_controller.find_label_all);

  router.get("/api/auto_send_mail", mail_controller.auto_send_mail);

  router.post("/api/manual_send_mail", mail_controller.manual_send_mail);

  router.post("/api/label", label_controller.create_label);

  router.get("/api/label_printer_state", label_controller.label_printer_state);

  router.post("/api/create_user", user_controller.create_user);
  
  router.delete("/api/label", label_controller.delete_label);

  router.put("/api/label", label_controller.update_label);
};

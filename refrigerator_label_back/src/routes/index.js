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
  
  router.get("/api/user", user_controller.user_update);

  router.get("/api/auto_send_mail", mail_controller.auto_send_mail);
  router.post("/api/manual_send_mail", mail_controller.manual_send_mail);

  router.get("/api/find_label_all", label_controller.find_label_all);
  router.post("/api/label", label_controller.create_label);
  router.delete("/api/label", label_controller.delete_label);
  router.put("/api/label", label_controller.update_label);
  router.post("/api/printer_state_change", label_controller.printer_state_change);

  router.get("/api/admin", admin_controller.find_admin_all);
  router.post("/api/admin", admin_controller.admin_create);
  router.delete("/api/admin", admin_controller.admin_delete);
  router.put("/api/reset_password", admin_controller.reset_password);

};

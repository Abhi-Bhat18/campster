const axios = require("axios");

exports.register = function () {
  const plugin = this;

  plugin.loadConfig(); // load the configs
  plugin.register_hook("bounce", "handle_bounce");
  plugin.loginfo("Bounce tracker plugin registered successfully");
};

exports.loadConfig = function () {
  const plugin = this;
  plugin.cfg = plugin.config.get("bounce_tracker.ini", {
    booleans: ["+enabled"],
  });
};

exports.handle_bounce = async function (next, hmail, error) {
  const plugin = this;

  const data = {
    mail: error.bounced_rcpt[0].original,
    dns_smtp_code: error.bounced_rcpt[0].dns_smtp_code,
  };

  try {
    await axios.post(plugin.cfg.main.endpoint, data, {
      headers: {
        "x-api-key": plugin.cfg.main.api_key,
      },
    });
    plugin.loginfo("Bounce hook called successfully");
  } catch (error) {
    plugin.logerror(error);
  }
  return "OK";
};

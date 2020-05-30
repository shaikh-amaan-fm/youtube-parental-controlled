cordova.define('cordova/plugin_list', function(require, exports, module) {
  module.exports = [
    {
      "id": "cordova-plugin-badge.Badge",
      "file": "plugins/cordova-plugin-badge/www/badge.js",
      "pluginId": "cordova-plugin-badge",
      "clobbers": [
        "plugin.notification.badge",
        "cordova.plugins.notification.badge"
      ]
    },
    {
      "id": "cordova-plugin-device.device",
      "file": "plugins/cordova-plugin-device/www/device.js",
      "pluginId": "cordova-plugin-device",
      "clobbers": [
        "device"
      ]
    },
    {
      "id": "de.appplant.cordova.plugin.local-notification.LocalNotification",
      "file": "plugins/de.appplant.cordova.plugin.local-notification/www/local-notification.js",
      "pluginId": "de.appplant.cordova.plugin.local-notification",
      "clobbers": [
        "cordova.plugins.notification.local",
        "plugin.notification.local"
      ]
    },
    {
      "id": "de.appplant.cordova.plugin.local-notification.LocalNotification.Core",
      "file": "plugins/de.appplant.cordova.plugin.local-notification/www/local-notification-core.js",
      "pluginId": "de.appplant.cordova.plugin.local-notification",
      "clobbers": [
        "cordova.plugins.notification.local.core",
        "plugin.notification.local.core"
      ]
    },
    {
      "id": "de.appplant.cordova.plugin.local-notification.LocalNotification.Util",
      "file": "plugins/de.appplant.cordova.plugin.local-notification/www/local-notification-util.js",
      "pluginId": "de.appplant.cordova.plugin.local-notification",
      "merges": [
        "cordova.plugins.notification.local.core",
        "plugin.notification.local.core"
      ]
    },
    {
      "id": "cordova-plugin-notification.notify",
      "file": "plugins/cordova-plugin-notification/www/Notify.js",
      "pluginId": "cordova-plugin-notification",
      "clobbers": [
        "Notify"
      ]
    },
    {
      "id": "cordova-plugin-dialogs.notification",
      "file": "plugins/cordova-plugin-dialogs/www/notification.js",
      "pluginId": "cordova-plugin-dialogs",
      "merges": [
        "navigator.notification"
      ]
    },
    {
      "id": "cordova-plugin-dialogs.notification_android",
      "file": "plugins/cordova-plugin-dialogs/www/android/notification.js",
      "pluginId": "cordova-plugin-dialogs",
      "merges": [
        "navigator.notification"
      ]
    }
  ];
  module.exports.metadata = {
    "cordova-plugin-whitelist": "1.3.4",
    "cordova-plugin-app-event": "1.2.2",
    "cordova-plugin-badge": "0.7.4",
    "cordova-plugin-device": "2.0.3",
    "de.appplant.cordova.plugin.local-notification": "0.8.5",
    "cordova-plugin-notification": "1.3.7",
    "cordova-plugin-dialogs": "2.0.2"
  };
});
/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1557275564990_3126';

  // add your middleware config here
  config.middleware = [];

  // mongo db
  config.mongo = {
    client: {
      host: process.env.MONGODB_URL,
      name: process.env.MONGODB_NAME,
      port: process.env.MONGODB_PORT,
      user: process.env.MONGODB_USER,
      password: process.env.MONGODB_PWD
    }
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};

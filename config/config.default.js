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

  // views
  config.view = {
    defaultViewEngine: 'handlebars',
    defaultExtension: '.hbs',
    mapping: {
      '.hbs': 'handlebars',
    },
  };

  // static
  config.static = {
    prefix: '/bab-web'
  };

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1557275564990_3126';

  // add your middleware config here
  config.middleware = [];

  // mongo db
  config.mongoose = {
    url: process.env.MONGODB_URL,
  };

  // securify
  config.security = {
    csrf: {
      enable: false
    }
  };

  // cors
  config.cors = {
    origin: '*',
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
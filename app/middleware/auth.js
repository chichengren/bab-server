'use strict';

module.exports = options => {
  return async function auth(ctx, next) {
    // if (ctx.app.env !== 'prod') {
    //   await next();
    //   return;
    // }

    // const authorization = ctx.request.authorization || '';
    // const tokens = authorization.split(' ');

    // if (tokens.length !== 2 || tokens[0] !== 'Bearer') {
    //   ctx.throw(401, 'Not Authorized');
    // }

    // TODO: auth

    await next();
  };
};

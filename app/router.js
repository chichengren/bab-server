'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);

  // court
  router.get('/court', controller.court.index);
  router.post('/court/register', controller.court.register);
  router.post('/court/unregister', controller.court.unregister);

  // player
  router.get('/api/players', controller.player.index);
  router.get('/api/players/get', controller.player.get);
  router.post('/api/players/add', controller.player.add);
  router.delete('/api/players/delete', controller.player.delete);

  // member
  router.get('/member', controller.member.index);
  router.get('/member/get', controller.member.get);
  router.post('/member/add', controller.member.add);
  router.post('/member/delete', controller.member.delete);

  // session
  router.get('/session', controller.session.index);
  router.post('/session/start', controller.session.start);
  router.post('/session/end', controller.session.end);
};

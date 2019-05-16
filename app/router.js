'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);

  // court
  router.get('/api/courts', controller.court.index);
  router.post('/api/courts/register', controller.court.register);
  router.post('/api/courts/unregister', controller.court.unregister);

  // player
  router.get('/api/players', controller.player.index);
  router.get('/api/players/get', controller.player.get);
  router.post('/api/players/add', controller.player.add);
  router.delete('/api/players/delete', controller.player.delete);

  // member
  router.get('/api/members', controller.member.index);
  router.get('/api/members/get', controller.member.get);
  router.post('/api/members/add', controller.member.add);
  router.post('/api/members/delete', controller.member.delete);

  // session
  router.get('/api/sessions', controller.session.index);
  router.post('/api/sessions/start', controller.session.start);
  router.post('/api/sessions/end', controller.session.end);
};

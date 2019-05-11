'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);

  router.get('/courts', controller.court.index);
  // router.post('/courts/register', controller.courts.register);
  // router.post('/courts/unregister', controller.courts.unregister);
  // router.post('/courts/reset', controller.courts.reset);

  router.get('/member', controller.member.index);
  router.get('/member/get', controller.member.get);
  router.post('/member/add', controller.member.add);
  router.post('/member/delete', controller.member.delete);
};

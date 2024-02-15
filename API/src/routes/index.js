const express = require('express');
const emailListRoute = require('./emailList.route');
const newslettersRoute = require('./newsletters.route');
const metricsRoute = require('./metrics.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/email-list',
    route: emailListRoute,
  },
  {
    path: '/newsletters',
    route: newslettersRoute,
  },
  {
    path: '/metrics',
    route: metricsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;

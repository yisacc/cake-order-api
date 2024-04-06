import express from 'express';
import authRoute from './auth.route';
import docsRoute from './docs.route';
import config from '../../config/config';
import orderRoute from './order.route';
import cakeShapeRoute from './cakeShape.route';

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute
  },
  {
    path: '/orders',
    route: orderRoute
  },
  {
    path: '/cake-shapes',
    route: cakeShapeRoute
  }
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute
  }
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

export default router;
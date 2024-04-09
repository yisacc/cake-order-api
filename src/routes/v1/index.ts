import express, { Router } from 'express';
import authRoute from './auth.route';
import docsRoute from './docs.route';
import config from '../../config/config';
import orderRoute from './order.route';
import cakeShapeRoute from './cakeShape.route';
import cakeSizeRoute from './cakeSize.route';
import toppingRoute from './toppings.route';

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
  },
  {
    path: '/cake-sizes',
    route: cakeSizeRoute
  },
  {
    path: '/toppings',
    route: toppingRoute
  },
  {
    path: '/docs',
    route: docsRoute
  }
];

const devRoutes: { path: string, route: Router }[] = [
  // routes available only in development mode
  // this is where i would be putting the docs route if it wasn't for exam
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
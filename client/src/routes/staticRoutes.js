import Landing from '../containers/Landing';
import Dashboard from '../containers/Dashboard';

const routes = [
  {
    exact: true,
    path: '/',
    component: Landing,
  },
  {
    protected: true,
    exact: true,
    path: '/dashboard/tours',
    component: Dashboard,
    routes: [
      {
        path: '/dashboard/shows',
        component: null,
      },
      {
        path: '/dashboard/sent',
        component: null,
      },
    ],
  },
];

export default routes;

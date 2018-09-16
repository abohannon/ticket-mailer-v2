import Landing from 'containers/Landing';
import Dashboard from 'containers/Dashboard';
import Tours from 'components/Tours';
import Shows from 'components/Shows';

const routes = [
  {
    exact: true,
    path: '/',
    component: Landing,
  },
  {
    protected: true,
    path: '/dashboard',
    component: Dashboard,
    routes: [
      {
        path: '/dashboard/tours',
        component: Tours,
      },
      {
        path: '/dashboard/shows/all',
        component: Shows,
      },
      {
        path: '/dashboard/shows/:tour_title',
        component: Shows,
      },
      {
        path: '/dashboard/sent',
        component: null,
      },
    ],
  },
];

export default routes;

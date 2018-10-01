import Landing from 'containers/Landing';
import Dashboard from 'containers/Dashboard';
import Tours from 'containers/Tours';
import Shows from 'containers/Shows';
import Orders from 'components/Orders';
import UserSettings from 'containers/UserSettings';

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
        path: '/dashboard/orders/:tour_title/:bundle_title',
        component: Orders,
      },
      {
        path: '/dashboard/sent',
        component: null,
      },
      {
        path: '/dashboard/settings/user',
        component: UserSettings,
      },
    ],
  },
];

export default routes;

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
    path: '/dashboard',
    component: Dashboard,
  },
];

export default routes;

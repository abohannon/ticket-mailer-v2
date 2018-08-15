import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

const propTypes = {

};

const RouteHandler = route => (
  <Route
    path={route.path}
    render={props => <route.component {...props} routes={route.routes} />}
  />
);

RouteHandler.propTypes = propTypes;

export default RouteHandler;

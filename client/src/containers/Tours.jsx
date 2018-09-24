import React from 'react';
import { connect } from 'react-redux';
import Tours from 'components/Tours';

const mapStateToProps = ({
  application: {
    fetchToursPending,
    fetchToursResolved,
  },
}) => ({
  fetchToursPending,
  fetchToursResolved,
});

export default connect(mapStateToProps)(Tours);

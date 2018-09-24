import React from 'react';
import { connect } from 'react-redux';
import Shows from 'components/Shows';

const mapStateToProps = ({
  application: {
    fetchShowsPending,
    fetchShowsResolved,
  },
}) => ({
  fetchShowsPending,
  fetchShowsResolved,
});

export default connect(mapStateToProps)(Shows);

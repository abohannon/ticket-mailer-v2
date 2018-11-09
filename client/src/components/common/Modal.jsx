import React from 'react'
import PropTypes from 'prop-types'
import { Modal as AntModal } from 'antd'

const Modal = props => (
  <AntModal {...props}>{props.children}</AntModal>
)

export { Modal }

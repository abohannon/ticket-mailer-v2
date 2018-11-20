import React from 'react'
import { Modal } from 'components/common'
import { hideModal } from 'actions/modalActions'

const ModalInviteUser = (props) => {
  const { dispatch, visible } = props
  return (
    <Modal
      title="Send invite to new team member"
      visible={visible}
      onOk={() => dispatch(hideModal())}
      onCancel={() => dispatch(hideModal())}
    >
      <p>Enter the email address of the user you want to invite.</p>
      <input />
    </Modal>
  )
}

export default ModalInviteUser

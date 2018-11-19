import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { List, Button } from 'antd'
import { CARD_TITLE_SECONDARY } from 'constants'

import { Card, Spacer, Modal } from 'components/common'

class TeamRoles extends Component {
  static propTypes = {
    isAdmin: PropTypes.bool,
    users: PropTypes.object,
  }

  state = {
    removeAdminModalVisible: false,
    deleteUserModalVisible: false,
    makeAdminModalVisible: false,
    modalVisible: false,
    modal: null,
    selectedUser: {},
  }

  // TODO: Refactor this...
  handleModal = (action, data, callback) => {
    switch (action) {
      case 'removeAdmin': {
        this.setState({
          modalVisible: true,
          selectedUser: data,
        }, () => {
          this.setState({ modal: this.renderRemoveAdminModal() })
        })
        break
      }
      case 'deleteUser': {
        this.setState({
          modalVisible: true,
          selectedUser: data,
        }, () => {
          this.setState({ modal: this.renderDeleteUserModal() })
        })
        break
      }
      case 'makeAdmin': {
        this.setState({
          modalVisible: true,
          selectedUser: data,
        }, () => {
          this.setState({ modal: this.renderMakeAdminModal() })
        })
        break
      }
      case 'invite': {
        this.setState({
          modalVisible: true,
        }, () => {
          this.setState({ modal: this.renderInviteModal() })
        })
        break
      }
      case 'closeModal': {
        this.setState({
          modalVisible: false,
          modal: null,
        })
        break
      }
      default:
        return null
    }

    if (callback) {
      callback()
    }
  }

  renderRemoveAdminModal = () => {
    const { modalVisible } = this.state

    return (
      <Modal
        title="Remove admin"
        centered
        visible={modalVisible}
        onOk={() => this.handleModal('closeModal', null, () => console.log('OK!'))}
        onCancel={() => this.handleModal('closeModal')}
        okText="Confirm"
        cancelText="Close"
      >
     Are you sure you want to remove this user's admin privileges?
      </Modal>
    )
  }

  renderDeleteUserModal = () => {
    const { modalVisible, selectedUser: { userId } } = this.state
    const { deleteUser } = this.props

    return (
      <Modal
        title="Delete user"
        centered
        visible={modalVisible}
        onOk={() => this.handleModal('closeModal', null, () => deleteUser(userId))}
        onCancel={() => this.handleModal('closeModal')}
        okText="Confirm"
        cancelText="Close"
      >
      Are you sure you want to delete this user from Ticket Mailer?
      </Modal>
    )
  }

  renderMakeAdminModal = () => {
    const { modalVisible } = this.state

    return (
      <Modal
        title="Promote user to admin"
        centered
        visible={modalVisible}
        onOk={() => this.handleModal('closeModal', null, () => console.log('Make admin!'))}
        onCancel={() => this.handleModal('closeModal')}
        okText="Confirm"
        cancelText="Close"
      >
        Are you sure you want to promote this user to admin?
      </Modal>
    )
  }

  renderInviteModal = () => {
    const { modalVisible } = this.state

    return (
      <Modal
        title="Invite new team member to join Ticket Mailer"
        centered
        visible={modalVisible}
        onOk={() => this.handleModal('closeModal')}
        onCancel={() => this.handleModal('closeModal')}
        okText="Confirm"
        cancelText="Close"
      >
        <input />
      </Modal>
    )
  }


  renderAdminActions = user => ([
    <a href="#" onClick={() => this.handleModal('removeAdmin', user)}>Remove admin</a>,
    <a href="#" onClick={() => this.handleModal('deleteUser', user)}>Delete user</a>,
  ])

  renderEditorActions = user => ([
    <a href="#" onClick={() => this.handleModal('makeAdmin', user)}>Make admin</a>,
    <a href="#" onClick={() => this.handleModal('deleteUser', user)}>Delete user</a>,
  ])

  renderInviteButton = () => (
    <Button
      type="primary"
      onClick={() => this.handleModal('invite')}
    >
      Invite team member
    </Button>
  )

  render() {
    const { isAdmin, users, deleteUser } = this.props
    const { modal, selectedUser: { userId } } = this.state

    const adminData = []
    const editorData = []

    if (users.payload) {
      users.payload.forEach((user) => {
        if (user.admin) {
          return adminData.push({
            name: user.name,
            userId: user._id,
          })
        }

        return editorData.push({
          name: user.name,
          userId: user._id,
        })
      })
    }

    return (
      <Card
        title="Team roles"
        headStyle={CARD_TITLE_SECONDARY}
        extra={this.renderInviteButton()}
      >
        <div>
          <List
            size="small"
            header={<div style={{ fontWeight: 700 }}>Admin</div>}

            dataSource={adminData}
            renderItem={item => (
              <List.Item actions={isAdmin && this.renderAdminActions(item)}>{item.name}</List.Item>
            )}
          />
          <Spacer />
          <List
            size="small"
            header={<div style={{ fontWeight: 700 }}>Editor</div>}
            dataSource={editorData}
            renderItem={item => (
              <List.Item actions={isAdmin && this.renderEditorActions(item)}>{item.name}</List.Item>
            )}
          />
          {modal}
        </div>
      </Card>
    )
  }
}

export default TeamRoles

// <Modal
// title="Delete user"
// centered
// visible={this.state.modalVisible}
// onOk={() => deleteUser(userId, this.setModalVisible(false, 'deleteUser'))}
// onCancel={() => this.setModalVisible(false, 'deleteUser')}
// okText="Confirm"
// cancelText="Close"
// >
// Are you sure you want to delete this user from Ticket Mailer?
// </Modal>
// <Modal
// title="Promote user to admin"
// centered
// visible={this.state.modalVisible}
// onOk={() => this.setModalVisible(false, 'makeAdmin')}
// onCancel={() => this.setModalVisible(false, 'makeAdmin')}
// okText="Confirm"
// cancelText="Close"
// >
// Are you sure you want to promote this user to admin?
// </Modal>

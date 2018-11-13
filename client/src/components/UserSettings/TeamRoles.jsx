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

  handleModal = (action, data, callback) => {
    console.log('handleModal')
    console.log(action, data, callback)
    switch (action) {
      case 'removeAdmin': {
        console.log('inside remove admin')
        this.setState({
          modalVisible: true,
          modal: this.renderAdminModal(),
          selectedUser: data,
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

  setModalVisible = (status, type, user) => {
    switch (type) {
      case 'removeAdmin':
        this.setState({ removeAdminModalVisible: status })
        break
      case 'deleteUser':
        this.setState({ deleteUserModalVisible: status })
        break
      case 'makeAdmin':
        this.setState({ makeAdminModalVisible: status })
        break
      default:
        return null
    }
  }

  selectUser = (selectedUser, modal) => {
    this.setState({ selectedUser }, () => this.setModalVisible(true, modal))
  }

  renderAdminModal = () => {
    const { modalVisible } = this.state

    return (
      <Modal
        title="Remove admin"
        centered
        visible={modalVisible}
        onOk={() => this.handleModal('closeModal', null, () => console.log('OK!'))}
        onCancel={() => console.log('onCancel')}
        okText="Confirm"
        cancelText="Close"
      >
     Are you sure you want to remove this user's admin privileges?
      </Modal>
    )
  }

  renderAdminActions = user => ([
    <a href="#" onClick={() => this.handleModal('removeAdmin', user)}>Remove admin</a>,
    <a href="#" onClick={() => this.selectUser(user, 'deleteUser')}>Delete user</a>,
  ])

  renderEditorActions = user => ([
    <a href="#" onClick={() => this.selectUser(user, 'makeAdmin')}>Make admin</a>,
    <a href="#" onClick={() => this.selectUser(user, 'deleteUser')}>Delete user</a>,
  ])

  renderInviteButton = () => (
    <Button
      type="primary"
      onClick={() => console.log('Invite User')}
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

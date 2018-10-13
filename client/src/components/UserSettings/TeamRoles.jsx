import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List } from 'antd';

import { Spacer, Modal } from 'components/common';

class TeamRoles extends Component {
  static propTypes = {
    isAdmin: PropTypes.bool,
    users: PropTypes.object,
  }

  state = {
    removeAdminModalVisible: false,
    deleteUserModalVisible: false,
    makeAdminModalVisible: false,
    selectedUser: {},
  }

  setModalVisible = (status, type, user) => {
    switch (type) {
      case 'removeAdmin':
        this.setState({ removeAdminModalVisible: status });
        break;
      case 'deleteUser':
        this.setState({ deleteUserModalVisible: status });
        break;
      case 'makeAdmin':
        this.setState({ makeAdminModalVisible: status });
        break;
      default:
        return null;
    }
  }

  selectUser = (selectedUser, modal) => {
    this.setState({ selectedUser }, () => this.setModalVisible(true, modal));
  }

  renderAdminActions = user => ([
    <a href="#" onClick={() => this.selectUser(user, 'removeAdmin')}>Remove admin</a>,
    <a href="#" onClick={() => this.selectUser(user, 'deleteUser')}>Delete user</a>,
  ])

  renderEditorActions = user => ([
    <a href="#" onClick={() => this.selectUser(user, 'makeAdmin')}>Make admin</a>,
    <a href="#" onClick={() => this.selectUser(user, 'deleteUser')}>Delete user</a>,
  ])

  render() {
    const { isAdmin, users, deleteUser } = this.props;
    const { selectedUser: { userId } } = this.state;

    const adminData = [];
    const editorData = [];

    if (users.payload) {
      users.payload.forEach((user) => {
        if (user.admin) {
          return adminData.push({
            name: user.name,
            userId: user._id,
          });
        }

        return editorData.push({
          name: user.name,
          userId: user._id,
        });
      });
    }

    return (
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
        <Modal
          title="Remove admin"
          centered
          visible={this.state.removeAdminModalVisible}
          onOk={() => this.setModalVisible(false, 'removeAdmin')}
          onCancel={() => this.setModalVisible(false, 'removeAdmin')}
          okText="Confirm"
          cancelText="Close"
        >
          Are you sure you want to remove this user's admin privileges?
        </Modal>
        <Modal
          title="Delete user"
          centered
          visible={this.state.deleteUserModalVisible}
          onOk={() => deleteUser(userId, this.setModalVisible(false, 'deleteUser'))}
          onCancel={() => this.setModalVisible(false, 'deleteUser')}
          okText="Confirm"
          cancelText="Close"
        >
          Are you sure you want to delete this user from Ticket Mailer?
        </Modal>
        <Modal
          title="Promote user to admin"
          centered
          visible={this.state.makeAdminModalVisible}
          onOk={() => this.setModalVisible(false, 'makeAdmin')}
          onCancel={() => this.setModalVisible(false, 'makeAdmin')}
          okText="Confirm"
          cancelText="Close"
        >
          Are you sure you want to promote this user to admin?
        </Modal>
      </div>
    );
  }
}

export default TeamRoles;

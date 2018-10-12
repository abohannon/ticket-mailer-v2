import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List } from 'antd';

import { Spacer, Modal } from 'components/common';

class TeamRoles extends Component {
  state = {
    modalVisible: false,
  }

  setModalVisible = (status) => {
    this.setState({ modalVisible: status });
  }

  renderEditButton = () => <a href="#" onClick={() => this.setModalVisible(true)}>Edit</a>

  render() {
    const adminData = [
      'Carynn',
      'Adam',
    ];

    const editorData = [
      'Chase',
      'Ryan',
    ];

    return (
      <div>
        <List
          size="small"
          header={<div style={{ fontWeight: 700 }}>Admin</div>}

          dataSource={adminData}
          renderItem={item => (<List.Item actions={[this.renderEditButton()]}>{item}</List.Item>)}
        />
        <Spacer />
        <List
          size="small"
          header={<div style={{ fontWeight: 700 }}>Editor</div>}

          dataSource={editorData}
          renderItem={item => (<List.Item actions={[this.renderEditButton()]}>{item}</List.Item>)}
        />
        <Modal
          title="Edit user"
          centered
          visible={this.state.modalVisible}
          onOk={() => this.setModalVisible(false)}
          onCancel={() => this.setModalVisible(false)}
        >
          Test
        </Modal>
      </div>
    );
  }
}

export default TeamRoles;

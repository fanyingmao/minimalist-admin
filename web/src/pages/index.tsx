
import { Alert, Checkbox, Icon, Button, AutoComplete, Modal, message } from 'antd';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import React, { Component } from 'react';

import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { Dispatch, AnyAction } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import Link from 'umi/link';
import { connect } from 'dva';
import { ConnectState } from '@/models/connect';
import { StateType } from '@/models/action';
import { DataSourceItemObject } from 'antd/lib/auto-complete';


interface ActionProps {
  dispatch: Dispatch<AnyAction>;
  userAction: StateType;
}
interface ActionState {
  actionList: DataSourceItemObject[];
}

@connect(({ action }: ConnectState) => ({
  userAction: action,
}))
class Admin extends Component<ActionProps, ActionState> {
  loginForm: FormComponentProps['form'] | undefined | null = undefined;

  state: ActionState = {
    actionList: [],
  };
  handleGetAllAction = () => { // 1、点击事件
    const { dispatch } = this.props;
    dispatch({
      type: 'action/allAction',// action 对应 *getAllAction
      payload: {},
    });
  };

  onSelect = (value: any) => {
    message.info('onSelect:' + value);
  };

  onSearch = (searchText: string) => {
    // this.setState({
    //   dataSource: !searchText ? [] : [searchText, searchText.repeat(2), searchText.repeat(3)],
    // });
  };


  render() {
    const { userAction } = this.props;
    const { actionList } = this.state;
    return (
      <div >
        <Button type="primary" onClick={this.handleGetAllAction}>更新配置</Button> 
        <AutoComplete
          dataSource={actionList}
          style={{ width: 200 }}
          onSelect={this.onSelect}
          onSearch={this.onSearch}
          placeholder="input here" />
      </div>
    );
  }
}

export default Admin;
import { Button, AutoComplete, message, List } from 'antd';
import React, { Component } from 'react';

import { Dispatch, AnyAction } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import { connect } from 'dva';
import { ConnectState } from '@/models/connect';
import { StateType } from '@/models/action';
import { DataSourceItemObject } from 'antd/lib/auto-complete';


interface ActionProps {
  dispatch: Dispatch<AnyAction>;
  userAction: StateType;
}
interface ActionState {
  searchText: string,
}
const data = [
  'Racing car sprays burning fuel into crowd.',
  'Japanese princess to wed commoner.',
  'Australian walks 100km after outback crash.',
  'Man charged over missing wedding girl.',
  'Los Angeles battles huge wildfires.',
];

@connect(({ action }: ConnectState) => ({
  userAction: action,
}))
class Admin extends Component<ActionProps, ActionState> {
  loginForm: FormComponentProps['form'] | undefined | null = undefined;

  state: ActionState = {
    searchText: "",
  };
  handleGetAllAction = () => { // 1、点击事件

  };

  onSelect = (value: any) => {
    message.info('onSelect:' + value);
  };

  onSearch = (searchText: string) => {
    this.setState({
      searchText
    });
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'action/allAction',// action 对应 *getAllAction
      payload: {},
    });
  }

  render() {
    const { userAction } = this.props;
    const { searchText } = this.state;
    const dataSource = userAction.actionList.map((item, index): DataSourceItemObject => ({ value: index.toString(), text: item.title }))
      .filter(itme => itme.text.includes(searchText));
    return (
      <div >
        <AutoComplete
          dataSource={dataSource}
          style={{ width: 200 }}
          onSelect={this.onSelect}
          onSearch={this.onSearch}
          placeholder="input here" />
        <Button type="primary" onClick={this.handleGetAllAction}>执行</Button>
        <List
          size="small"
          header={<div>Header</div>}
          footer={<div>Footer</div>}
          bordered
          dataSource={data}
          renderItem={item => <List.Item>{item}</List.Item>}
        />
      </div>
    );
  }
}

export default Admin;
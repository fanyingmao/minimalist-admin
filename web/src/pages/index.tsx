import { Button, AutoComplete, List, Input, Form } from 'antd';
import React, { Component } from 'react';

import { Dispatch, AnyAction } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import { connect } from 'dva';
import { ConnectState } from '@/models/connect';
import { StateType } from '@/models/action';
import { DataSourceItemObject } from 'antd/lib/auto-complete';
import { SelectValue } from 'antd/lib/select';
import styles from './index.css';
import { IRsqPostRunAction } from '@/share/Api';
import { ParmaReg } from '@/share/Constant';

interface ActionProps {
  dispatch: Dispatch<AnyAction>;
  userAction: StateType;
  submitting: boolean;
}
interface ActionState {
  searchText: string,
  selectIdx: number,
}

class InputItem {
  public lableName: string = '';
  public value: string = '';
  constructor(paramStr: string) {
    const paramArr: string[] = paramStr.replace('<', '').replace('>', '').split(',');
    this.lableName = paramArr[0];
  }
  onChange(event: any) {
    if (event && event.target && event.target.value) {
      this.value = event.target.value;
    }
  }
}

@connect(({ action, loading }: ConnectState) => ({
  userAction: action,
  submitting: loading.effects['action/runAction'],
}))
class Admin extends Component<ActionProps, ActionState> {
  loginForm: FormComponentProps['form'] | undefined | null = undefined;
  private module: InputItem[] = [];
  private upSelectIdx = -1;
  state: ActionState = {
    searchText: "",
    selectIdx: 0,
  };
  handleRunAction = () => { // 1、点击事件
    const { dispatch } = this.props;
    const { selectIdx } = this.state;
    let params: IRsqPostRunAction = {
      index: selectIdx.toString(),
      params: this.module.map(item => item.value).join(','),
    };
    // message.info('onSelect:' + JSON.stringify(this.module));
    dispatch({
      type: 'action/runAction',// action 对应 *getAllAction
      payload: params,
    });
  };

  onSelect = (value: SelectValue) => {
    this.setState({
      selectIdx: Number.parseInt(value.toString())
    });

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
    const { userAction, submitting } = this.props;
    const { searchText, selectIdx } = this.state;
    let dataSource: DataSourceItemObject[] = [];
    if (userAction.actionList && userAction.actionList.length > 0) {
      dataSource = userAction.actionList.map((item, index): DataSourceItemObject => ({ value: index.toString(), text: item.title }))
        .filter(itme => itme.text.includes(searchText));
      if (this.upSelectIdx !== selectIdx) {
        this.upSelectIdx = selectIdx;
        let machArr = userAction.actionList[selectIdx].module.match(ParmaReg);
        if (machArr) {
          this.module = machArr.map(item => new InputItem(item));
        }
        else {
          this.module = [];
        }
      }
    }
    return (
      <div className={styles.diva} >
        <div className={styles.divb}>
          <List
            size="small"
            className={styles.list}
            header={<div >
              <AutoComplete
                dataSource={dataSource}
                style={{ width: 300 }}
                onSelect={this.onSelect}
                onSearch={this.onSearch}
                placeholder="input here" />
              <Button type="primary" onClick={this.handleRunAction} className={styles.btn} loading={submitting}>执行</Button>
            </div>}
            footer={<div>
              <p>执行结果:</p>
              {userAction.result}
            </div>}
            bordered
            dataSource={this.module}
            renderItem={item => <List.Item >
              <Form layout="inline">
                <Form.Item label={item.lableName} hasFeedback validateStatus="">
                  <Input placeholder="Basic usage" onChange={event => item.onChange(event)} defaultValue={item.value} />
                </Form.Item>
              </Form>
            </List.Item>}
          />
        </div>
      </div>
    );
  }
}

export default Admin;
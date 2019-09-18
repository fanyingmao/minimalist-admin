  
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


interface ActionProps {
  dispatch: Dispatch<AnyAction>;
  userAction: StateType;
}
interface ActionState {
  type: string;
}

@connect(({ action }: ConnectState) => ({
  userAction: action,
}))
class Admin extends Component<ActionProps, ActionState> {
  loginForm: FormComponentProps['form'] | undefined | null = undefined;


  showModal = () => {

  };

  onSelect = (value:any) => {
    message.info('onSelect:'+value);
  };

  onSearch = (searchText:string) => {
    // this.setState({
    //   dataSource: !searchText ? [] : [searchText, searchText.repeat(2), searchText.repeat(3)],
    // });
  };
  
  
  render() {
    const { userAction } = this.props;
    // const { dataSource} = this.state;
    return (
      <div >
          <Button type="primary" onClick={this.showModal}>fdsafdasf</Button>
          <AutoComplete 
              //  dataSource={dataSource}
               style={{ width: 200 }}
               onSelect={this.onSelect}
               onSearch={this.onSearch}
               placeholder="input here"/>
      </div>
    );
  }
}

export default Admin;
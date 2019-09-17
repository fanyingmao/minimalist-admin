  
import { Alert, Checkbox, Icon, Button, AutoComplete, Modal, message } from 'antd';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import React, { Component } from 'react';

import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { Dispatch, AnyAction } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import Link from 'umi/link';
import { connect } from 'dva';


interface LoginProps {
  dispatch: Dispatch<AnyAction>;
  submitting: boolean;
}
interface LoginState {
  visible: boolean;
  dataSource:string[];
}


class Admin extends Component<LoginProps, LoginState> {
  loginForm: FormComponentProps['form'] | undefined | null = undefined;

  state: LoginState = {
    visible: false,
    dataSource:['ffffff','fff2']
  };



  showModal = () => {
    this.setState({
      visible: true,
    });
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
    const { submitting } = this.props;
    const { visible,dataSource} = this.state;
    return (
      <div >
          <Button type="primary" onClick={this.showModal}>fdsafdasf</Button>
          <AutoComplete 
               dataSource={dataSource}
               style={{ width: 200 }}
               onSelect={this.onSelect}
               onSearch={this.onSearch}
               placeholder="input here"/>
      </div>
    );
  }
}

export default Admin;
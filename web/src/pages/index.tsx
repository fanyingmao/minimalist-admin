  
import { Alert, Checkbox, Icon, Button, AutoComplete } from 'antd';
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
  type: string;
  autoLogin: boolean;
}


class Admin extends Component<LoginProps, LoginState> {
  loginForm: FormComponentProps['form'] | undefined | null = undefined;

  state: LoginState = {
    type: 'account',
    autoLogin: true,
  };

  changeAutoLogin = (e: CheckboxChangeEvent) => {
    this.setState({
      autoLogin: e.target.checked,
    });
  };


  onTabChange = (type: string) => {
    this.setState({ type });
  };


  renderMessage = (content: string) => (
    <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />
  );

  render() {
    const { submitting } = this.props;
    const { type, autoLogin } = this.state;
    return (
      <div >
          <Button type="primary">fdsafdasf</Button>
          <AutoComplete />
      </div>
    );
  }
}

export default Admin;
import React from 'react';
import styles from './index.css';
import { AutoComplete, Icon, Input, Button } from 'antd';
function onSelect(value: string) {
  console.log('onSelect', value);
}

const BasicLayout: React.FC = props => {
  return (
    <div className={styles.base}>
        {props.children}
    </div>
  );
};

export default BasicLayout;

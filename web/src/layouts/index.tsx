import React from 'react';
import styles from './index.css';
import { AutoComplete, Icon, Input } from 'antd';
function onSelect(value: string) {
  console.log('onSelect', value);
}

const BasicLayout: React.FC = props => {
  return (
    <div className={styles.base}>
      <div className={styles.normal}>
        <h1 className={styles.title}>Minimalist Admin</h1>
        <AutoComplete />
      </div>
      <div className={styles.children}>
        {props.children}
      </div>
    </div>
  );
};

export default BasicLayout;

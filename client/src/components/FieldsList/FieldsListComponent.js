import React from 'react';

/* @Antd */
import { Button, List } from 'antd';

/* @Styles */
import styles from './FieldsList.module.css';

const FieldsListComponent = ({ regions = [] }) => {
  return (
    <div className={styles.listWrapper}>
      <List
        header={<div className={styles.listTitle}>Fields</div>}
        dataSource={regions}
        size="small"
        className={styles.fieldsList}
        renderItem={() => {
          return (
            <List.Item>
              <span>test</span>
            </List.Item>
          );
        }}
      />
      <Button className={styles.buttonWrapper} block size="large" onClick={() => {}}>
        Create field
      </Button>
    </div>
  );
};

export default FieldsListComponent;
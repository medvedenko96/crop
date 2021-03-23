import React from 'react';

/* @Antd */
import { Button, List } from 'antd';

/* @Styles */
import styles from './YearsList.module.css';

const YearsListComponent = ({ regions = [] }) => {
  return (
    <div className={styles.listWrapper}>
      <List
        header={<div className={styles.listTitle}>Years</div>}
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
        Create year
      </Button>
    </div>
  );
};

export default YearsListComponent;

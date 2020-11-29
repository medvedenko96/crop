import React from 'react';

/* @Antd */
import { Menu, Dropdown } from 'antd';

/* @Icons */
import { ReactComponent as MagicWand } from '../../static/icons/magic-wand.svg';

/* @Styles */
import styles from './MagicButton.module.css'

const MagicButtonComponent = ({ menuNodes }) => {
  const menu = (
    <Menu>
      {
        menuNodes.map((node, i) => (
          <Menu.Item key={i}>
            {node}
          </Menu.Item>
        ))
      }
    </Menu>
  );

  return (
    <div className={styles.componentWrapper}>
      <Dropdown overlay={menu} placement="topCenter" arrow>
        <button className={styles.buttonWrapper}>
          <MagicWand />
        </button>
      </Dropdown>
    </div>
  );
}

export default MagicButtonComponent;

import React from 'react';
import { Menu } from 'antd';

import './Menu.css';

const { ItemGroup, Item } = Menu;

const MenuComponent = ({ menuItem }) => {
  return (
    <Menu>
      {menuItem.map((el) => (
        el.items ? (
          <ItemGroup key={el.title} title={el.title} >
            {
              el.items.map(({ itemsTitle }) => (
                <Item  key={itemsTitle}>{itemsTitle}</Item>
              ))
            }
          </ItemGroup>
        ) : (
          <Item key={el.title}>{el.title}</Item>
        )
      ))}
    </Menu>
  );
};

export default MenuComponent;

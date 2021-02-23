import React from 'react';
import { Menu } from 'antd';

import './Menu.css';

const { ItemGroup, Item } = Menu;

const MenuComponent = ({ menuItem }) => (
  <Menu>
    {menuItem.map((el) => (el.items ? (
        <ItemGroup key={el.title} title={el.title}>
          {el.items.map(({ companyName, id }) => (
            <Item key={id}>{companyName}</Item>
          ))}
        </ItemGroup>
    ) : (
        <Item key={el.title}>{el.title}</Item>
    )),)}
  </Menu>
);

export default MenuComponent;

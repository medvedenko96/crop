import React from 'react';
import { array } from 'prop-types';
import { Menu } from 'antd';

import './Menu.css';

const { ItemGroup, Item } = Menu;

const propTypes = {
  menuItem: array,
};

const MenuComponent = ({ menuItem }) => (
  <Menu>
    {menuItem.map((el) => (
      <ItemGroup key={el.title} title={el.title}>
        {el.items.map(({ company, id }) => (
          <Item key={id}>{company}</Item>
        ))}
      </ItemGroup>
    ))}
  </Menu>
);

MenuComponent.propTypes = propTypes;

export default MenuComponent;

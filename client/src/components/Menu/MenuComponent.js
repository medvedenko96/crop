import React from 'react';
import { array } from 'prop-types';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';

import './Menu.css';

const { ItemGroup, Item } = Menu;

const propTypes = {
  menuItem: array,
};

const MenuComponent = ({ menuItem }) => {
  return (
    <Menu>
      {menuItem.map((el) => (
        <ItemGroup key={el.title} title={el.title}>
          {el.items.map(({ company, id }) => (
            <Item key={id}>
              <Link to={`/dashboard/${company}`}>{company}</Link>
            </Item>
          ))}
        </ItemGroup>
      ))}
    </Menu>
  );
};

MenuComponent.propTypes = propTypes;

export default MenuComponent;

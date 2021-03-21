import React from 'react';
import { array, func, string, object } from 'prop-types';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';

import './Menu.css';

const { ItemGroup, Item } = Menu;

const propTypes = {
  onClick: func,
  menuItem: array,
  companyId: string,
  companiesById: object,
};

const MenuComponent = ({ menuItem, onClick, companyId, companiesById }) => {
  return (
    <Menu onClick={onClick} selectedKeys={[companyId]}>
      {menuItem.map((el) => (
        <ItemGroup key={el.title} title={el.title}>
          {el.items.map((id) => (
            <Item key={id}>
              <Link to={`/dashboard/${id}`}>{companiesById[id].name}</Link>
            </Item>
          ))}
        </ItemGroup>
      ))}
    </Menu>
  );
};

MenuComponent.propTypes = propTypes;

export default MenuComponent;

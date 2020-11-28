import React from 'react';

import MenuComponent from './MenuComponent';

const MenuContainer = () => {
  const menuItem = [
    {
      title: 'Companies',
      items: [
        { itemsTitle: 'CompanyName1' },
        { itemsTitle: 'CompanyName2' },
        { itemsTitle: 'CompanyName3' },
        { itemsTitle: 'CompanyName4' },
        { itemsTitle: 'CompanyName5' },
        { itemsTitle: 'CompanyName6' },
      ],
    },
    {
      title: 'Settings',
      link: '/settings',
    },
  ];

  return <MenuComponent menuItem={menuItem} />;
};

export default MenuContainer;

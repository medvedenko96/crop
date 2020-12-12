import React, { useEffect } from 'react';
import { connect } from 'react-redux';

/* @Components */
import MenuComponent from './MenuComponent';

/* @Actions */
import { getCompaniesActions } from '../../store/actions/company';

const MenuContainer = ({ getCompanies, companies = [] }) => {
  useEffect(() => getCompanies(), [companies.length])

  const menuItem = [
    {
      title: 'Companies',
      items: companies,
    },
    {
      title: 'Settings',
      link: '/settings',
    },
  ];

  return <MenuComponent menuItem={menuItem} />;
};

const props = state => ({
  companies: state.companies?.listCompanies || [],
});

const actions = {
  getCompanies: getCompaniesActions
};

export default connect(props, actions)(MenuContainer);

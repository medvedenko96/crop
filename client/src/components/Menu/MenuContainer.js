import React, { useEffect } from 'react';
import { connect } from 'react-redux';

/* @Components */
import MenuComponent from './MenuComponent';

/* @Actions */
import { getCompaniesActions } from '../../store/actions/company';
import { array, func } from 'prop-types';

const propTypes = {
  getCompanies: func,
  companies: array,
};

const MenuContainer = ({ getCompanies, companies }) => {
  useEffect(() => getCompanies(), [companies.length]);

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

MenuContainer.propTypes = propTypes;

MenuContainer.defaultProps = {
  companies: [],
};

const props = (state) => ({
  companies: state.companies?.listCompanies,
});

const actions = {
  getCompanies: getCompaniesActions,
};

export default connect(props, actions)(MenuContainer);

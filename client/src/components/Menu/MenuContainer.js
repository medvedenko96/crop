import React, { useEffect } from 'react';
import { array, func, object } from 'prop-types';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

/* @Components */
import MenuComponent from './MenuComponent';

/* @Actions */
import { getCompaniesAction, setCurrentCompanyIdAction } from '../../store/company/actions';

const propTypes = {
  getCompanies: func,
  setCurrentCompanyId: func,
  companiesIds: array,
  companiesById: object,
};

const MenuContainer = ({ getCompanies, setCurrentCompanyId, companiesIds, companiesById }) => {
  const { companyId } = useParams();

  useEffect(() => {
    getCompanies();
    !!companyId && setCurrentCompanyId(companyId);
  }, []);

  const handleClick = ({ key }) => {
    setCurrentCompanyId(key);
  };

  const menuItem = [
    {
      title: 'Companies',
      items: companiesIds,
    },
  ];

  return (
    <MenuComponent menuItem={menuItem} onClick={handleClick} companyId={companyId} companiesById={companiesById} />
  );
};

MenuContainer.propTypes = propTypes;

MenuContainer.displayName = 'MenuContainer';

MenuContainer.defaultProps = {
  companies: [],
};

const mapStateToProps = ({ companies }) => ({
  companiesById: companies.byId,
  companiesIds: companies.allIds,
});

const mapDispatchToProps = {
  getCompanies: getCompaniesAction,
  setCurrentCompanyId: setCurrentCompanyIdAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuContainer);

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

/* @Components */
import MenuComponent from './MenuComponent';

/* @Actions */
import { getCompaniesAction, setCurrentCompanyIdAction } from '../../store/actions/company';
import { array, func } from 'prop-types';

const propTypes = {
  getCompanies: func,
  setCurrentCompanyId: func,
  companies: array,
};

const MenuContainer = ({ getCompanies, companies, setCurrentCompanyId }) => {
  const { companyId } = useParams();

  useEffect(() => {
    getCompanies();
    !!companyId && setCurrentCompanyId(companyId);
  }, []);

  const handleClick = ({ key }) => {
    setCurrentCompanyId(+key);
  };

  const menuItem = [
    {
      title: 'Companies',
      items: companies,
    },
  ];

  return <MenuComponent menuItem={menuItem} onClick={handleClick} companyId={companyId} />;
};

MenuContainer.propTypes = propTypes;

MenuContainer.displayName = 'MenuContainer';

MenuContainer.defaultProps = {
  companies: [],
};

const mapStateToProps = ({ companies }) => ({
  companies: companies.list || [],
});

const mapDispatchToProps = {
  getCompanies: getCompaniesAction,
  setCurrentCompanyId: setCurrentCompanyIdAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuContainer);

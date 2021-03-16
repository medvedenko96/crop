import React from 'react';
import { shape, string } from 'prop-types';

/* @Antd */
import { Divider, Empty } from 'antd';

import RegionsList from '../RegionsList';

const propTypes = {
  company: shape({
    name: string,
  }),
};

const DashboardContentContainer = ({ company }) => {
  const { name } = company;

  return (
    <>
      <div>
        {!!name ? (
          <div>
            <Divider orientation="left">{name?.toUpperCase()}</Divider>
            <RegionsList />
          </div>
        ) : (
          <Empty />
        )}
      </div>
    </>
  );
};

DashboardContentContainer.propTypes = propTypes;

DashboardContentContainer.displayName = 'DashboardContentContainer';

DashboardContentContainer.defaultProps = {
  company: { name: '' },
};

export default DashboardContentContainer;

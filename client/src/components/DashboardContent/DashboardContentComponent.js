import React from 'react';
import { shape, string } from 'prop-types';

/* @Antd */
import { Divider, Empty } from 'antd';

/* @Components */
import RegionsList from '../RegionsList';
import FieldsList from '../FieldsList';

/* @Styles */
import styles from './DashboardContent.module.css';

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
            <div className={styles.contentWrapper}>
              <div className={styles.regionsListWrapper}>
                <RegionsList />
              </div>
              <div className={styles.fieldsListWrapper}>
                <FieldsList />
              </div>
            </div>
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

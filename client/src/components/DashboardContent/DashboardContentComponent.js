import React from 'react';
import { number, shape, string, func, array } from 'prop-types';

/* @Antd */
import { Button, List, Typography, Divider, Empty } from 'antd';

/* @Components */
import { CreateRegionModal } from '../Modals';

/* @Styles */
import styles from './DashboardContent.module.css';

const propTypes = {
  isShowCreateRegionModal: func,
  onOpenCreateRegionModal: func,
  onSubmitCreateCompanyModal: func,
  onCancel: func,
  onDeleteRegion: func,
  onEditRegion: func,
  onRegionClick: func,
  company: shape({
    id: number,
    name: string,
    regions: array,
  }),
};

const DashboardContentContainer = ({
  company,
  isShowCreateRegionModal,
  onSubmitCreateCompanyModal,
  onOpenCreateRegionModal,
  onCancel,
  onDeleteRegion,
  onEditRegion,
  onRegionClick,
}) => {
  const { name, regions } = company;

  return (
    <>
      <div>
        {!!name ? (
          <div>
            <Divider orientation="left">{name?.toUpperCase()}</Divider>
            <div className={styles.listWrapper}>
              <div className={styles.regionListWrapper}>
                <List
                  header={<div className={styles.listTitle}>Regions</div>}
                  className={styles.regionList}
                  size="small"
                  dataSource={regions}
                  renderItem={({ id, name }) => (
                    <List.Item
                      className={styles.listItem}
                      key={id}
                      actions={[
                        <span
                          onClick={() => onEditRegion(id)}
                          className={styles.listActionItem}
                          key="list-loadmore-edit"
                        >
                          edit
                        </span>,
                        <span
                          onClick={() => onDeleteRegion(id)}
                          className={styles.listActionItem}
                          key="list-loadmore-more"
                        >
                          deleted
                        </span>,
                      ]}
                    >
                      <span onClick={() => onRegionClick(id)} className={styles.listActionText}>
                        {name}
                      </span>
                    </List.Item>
                  )}
                />
                <Button className={styles.buttonWrapper} block size="large" onClick={onOpenCreateRegionModal}>
                  Create region
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <Empty />
        )}
      </div>
      <CreateRegionModal
        isShowModal={isShowCreateRegionModal}
        onOk={onSubmitCreateCompanyModal}
        handleCancel={onCancel}
      />
    </>
  );
};

DashboardContentContainer.defaultProps = {
  company: {
    id: null,
    name: '',
    regions: [],
  },
};

DashboardContentContainer.propTypes = propTypes;

export default DashboardContentContainer;

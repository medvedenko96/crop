import React from 'react';
import { number, shape, string, func, array, bool } from 'prop-types';

/* @Antd */
import { Button, List, Divider, Empty } from 'antd';

/* @Components */
import { CreateRegionModal, UpdateRegionModal } from '../Modals';

/* @Styles */
import styles from './DashboardContent.module.css';

const propTypes = {
  isShowCreateRegionModal: bool,
  isShowUpdateRegionModal: bool,
  onOpenCreateRegionModal: func,
  onSubmitCreateCompanyModal: func,
  onUpdateCreateCompanyModal: func,
  onCancel: func,
  onDeleteRegion: func,
  onEditRegionClick: func,
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
  isShowUpdateRegionModal,
  onSubmitCreateCompanyModal,
  onOpenCreateRegionModal,
  onUpdateCreateCompanyModal,
  onCancel,
  onDeleteRegion,
  onEditRegionClick,
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
                          onClick={() => onEditRegionClick(id)}
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
      <UpdateRegionModal
        isShowModal={isShowUpdateRegionModal}
        onOk={onUpdateCreateCompanyModal}
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

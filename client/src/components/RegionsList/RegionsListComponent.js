import React from 'react';
import { array, bool, func, number, shape, string } from 'prop-types';

/* @Antd */
import { Button, List } from 'antd';

/* @Components */
import { CreateRegionModal, UpdateRegionModal } from '../Modals';

import styles from './RegionList.module.css';

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

const RegionsListComponent = ({
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
  const { regions } = company;

  return (
    <>
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
                  <span onClick={() => onDeleteRegion(id)} className={styles.listActionItem} key="list-loadmore-more">
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

RegionsListComponent.propTypes = propTypes;

RegionsListComponent.displayName = 'RegionsListComponent';

RegionsListComponent.defaultProps = {
  company: { regions: [] },
};

export default RegionsListComponent;

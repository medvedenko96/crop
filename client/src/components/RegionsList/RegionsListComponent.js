import React from 'react';
import { array, bool, func, number, shape, string } from 'prop-types';
import classNames from 'classnames/bind';

/* @Antd */
import { Button, List } from 'antd';

/* @Components */
import { CreateRegionModal, UpdateRegionModal } from '../Modals';

/* @Styles */
import styles from './RegionList.module.css';

const cx = classNames.bind(styles);

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
  currentRegionId: number,
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
  currentRegionId,
}) => {
  const { regions } = company;

  return (
    <>
      <div className={styles.listWrapper}>
        <List
          header={<div className={styles.listTitle}>Regions</div>}
          className={styles.regionList}
          size="small"
          dataSource={regions}
          renderItem={({ id, name }) => {
            const activeItem = currentRegionId === id;

            return (
              <List.Item
                className={cx(styles.listItem, { listItemActive: activeItem })}
                key={id}
                actions={[
                  <span onClick={() => onEditRegionClick(id)} className={styles.actionItem} key="list-loadmore-edit">
                    edit
                  </span>,
                  <span onClick={() => onDeleteRegion(id)} className={styles.actionItem} key="list-loadmore-more">
                    deleted
                  </span>,
                ]}
              >
                <span
                  onClick={() => onRegionClick(id)}
                  className={cx(styles.listActionText, { listActionTextActive: activeItem })}
                >
                  {name}
                </span>
              </List.Item>
            );
          }}
        />
        <Button className={styles.buttonWrapper} block size="large" onClick={onOpenCreateRegionModal}>
          Create region
        </Button>
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

import React from 'react';
import { func, bool, number, object } from 'prop-types';
import classNames from 'classnames/bind';

/* @Antd */
import { Button, List } from 'antd';

/* @Components */
import { CreateFieldModal } from '../Modals';

/* @Styles */
import styles from './FieldsList.module.css';

const cx = classNames.bind(styles);

const propTypes = {
  regionId: number,
  isShowCreateFieldModal: bool,
  onCancelModal: func,
  onOpenCreateFieldModal: func,
  onSubmitCreateCompanyModal: func,
  fieldsById: object,
  fieldsIds: object,
  currentFieldId: number,
  onFieldClick: func,
};

const FieldsListComponent = ({
  regionId,
  isShowCreateFieldModal,
  onCancelModal,
  onOpenCreateFieldModal,
  onSubmitCreateCompanyModal,
  fieldsById,
  fieldsIds,
  currentFieldId,
  onFieldClick,
}) => {
  const currentFieldsIds = fieldsIds[regionId] || [];

  return (
    <>
      <div className={styles.listWrapper}>
        <List
          header={<div className={styles.listTitle}>Fields</div>}
          dataSource={currentFieldsIds}
          size="small"
          className={styles.fieldsList}
          renderItem={(id) => {
            const activeItem = currentFieldId === id;

            return (
              <List.Item
                className={cx(styles.listItem, { listItemActive: activeItem })}
                key={id}
                actions={[
                  <span onClick={() => id} className={styles.actionItem} key="list-loadmore-edit">
                    edit
                  </span>,
                  <span onClick={() => id} className={styles.actionItem} key="list-loadmore-more">
                    deleted
                  </span>,
                ]}
              >
                <span
                  onClick={() => onFieldClick(id)}
                  className={cx(styles.listActionText, { listActionTextActive: activeItem })}
                >
                  {fieldsById[id].name}
                </span>
              </List.Item>
            );
          }}
        />
        <Button
          className={styles.buttonWrapper}
          block
          size="large"
          onClick={onOpenCreateFieldModal}
          disabled={!regionId}
        >
          Create field
        </Button>
      </div>
      <CreateFieldModal
        isShowModal={isShowCreateFieldModal}
        onOk={onSubmitCreateCompanyModal}
        handleCancel={onCancelModal}
      />
    </>
  );
};

FieldsListComponent.propTypes = propTypes;

FieldsListComponent.displayName = 'FieldsListComponent';

FieldsListComponent.defaultProps = {};

export default FieldsListComponent;

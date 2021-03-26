import React from 'react';
import { func, bool, number, object } from 'prop-types';
import classNames from 'classnames/bind';

/* @Antd */
import { Button, List } from 'antd';

/* @Components */
import { CreateFieldModal, UpdateFieldModal } from '../Modals';

/* @Styles */
import styles from './FieldsList.module.css';

const cx = classNames.bind(styles);

const propTypes = {
  regionId: number,
  isShowCreateFieldModal: bool,
  isShowUpdateFieldModal: bool,
  onCancelModal: func,
  onOpenCreateFieldModal: func,
  onSubmitCreateFieldModal: func,
  fieldsById: object,
  fieldsIds: object,
  currentFieldId: number,
  onFieldClick: func,
  onDeleteField: func,
  onUpdateField: func,
  onOpenUpdateFieldModal: func,
};

const FieldsListComponent = ({
  regionId,
  isShowCreateFieldModal,
  isShowUpdateFieldModal,
  onCancelModal,
  onOpenCreateFieldModal,
  onSubmitCreateFieldModal,
  fieldsById,
  fieldsIds,
  currentFieldId,
  onFieldClick,
  onDeleteField,
  onUpdateField,
  onOpenUpdateFieldModal,
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
                onClick={() => onFieldClick(id)}
                actions={[
                  <span
                    onClick={() => onOpenUpdateFieldModal(id)}
                    className={styles.actionItem}
                    key="list-loadmore-edit"
                  >
                    edit
                  </span>,
                  <span onClick={() => onDeleteField(id)} className={styles.actionItem} key="list-loadmore-more">
                    deleted
                  </span>,
                ]}
              >
                <span className={cx(styles.listActionText, { listActionTextActive: activeItem })}>
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
        onOk={onSubmitCreateFieldModal}
        handleCancel={onCancelModal}
      />
      <UpdateFieldModal isShowModal={isShowUpdateFieldModal} onOk={onUpdateField} handleCancel={onCancelModal} />
    </>
  );
};

FieldsListComponent.propTypes = propTypes;

FieldsListComponent.displayName = 'FieldsListComponent';

FieldsListComponent.defaultProps = {};

export default FieldsListComponent;

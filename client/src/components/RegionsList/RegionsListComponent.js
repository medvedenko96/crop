import React from 'react';
import { object, bool, func, number } from 'prop-types';
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
    onSubmitCreateRegionModal: func,
    onUpdateRegionModal: func,
    onCancel: func,
    onDeleteRegion: func,
    onEditRegionClick: func,
    onRegionClick: func,
    regionsIds: object,
    regionsById: object,
    currentRegionId: number,
    currentCompanyId: number
};

const RegionsListComponent = ({
    isShowCreateRegionModal,
    isShowUpdateRegionModal,
    onSubmitCreateRegionModal,
    onOpenCreateRegionModal,
    onUpdateRegionModal,
    onCancel,
    onDeleteRegion,
    onEditRegionClick,
    onRegionClick,
    regionsIds,
    regionsById,
    currentRegionId,
    currentCompanyId
}) => {
    const currentRegionIds = regionsIds[currentCompanyId] || [];

    return (
        <>
            <div className={styles.listWrapper}>
                <List
                    header={<div className={styles.listTitle}>Regions</div>}
                    className={styles.regionList}
                    size="small"
                    dataSource={currentRegionIds}
                    renderItem={(id) => {
                        const activeItem = currentRegionId === id;

                        return (
                            <List.Item
                                className={cx(styles.listItem, { listItemActive: activeItem })}
                                key={id}
                                onClick={() => onRegionClick(id)}
                                actions={[
                                    <span
                                        role="button"
                                        tabIndex={0}
                                        onClick={() => onEditRegionClick(id)}
                                        className={styles.actionItem}
                                        key="list-loadmore-edit">
                                        edit
                                    </span>,
                                    <span
                                        role="button"
                                        tabIndex={0}
                                        onClick={() => onDeleteRegion(id)}
                                        className={styles.actionItem}
                                        key="list-loadmore-more">
                                        deleted
                                    </span>
                                ]}>
                                <span
                                    className={cx(styles.listActionText, {
                                        listActionTextActive: activeItem
                                    })}>
                                    {regionsById[id].name}
                                </span>
                            </List.Item>
                        );
                    }}
                />
                <Button
                    className={styles.buttonWrapper}
                    block
                    size="large"
                    onClick={onOpenCreateRegionModal}>
                    Create region
                </Button>
            </div>
            <CreateRegionModal
                isShowModal={isShowCreateRegionModal}
                onOk={onSubmitCreateRegionModal}
                handleCancel={onCancel}
            />
            <UpdateRegionModal
                isShowModal={isShowUpdateRegionModal}
                onOk={onUpdateRegionModal}
                handleCancel={onCancel}
            />
        </>
    );
};

RegionsListComponent.propTypes = propTypes;

RegionsListComponent.displayName = 'RegionsListComponent';

RegionsListComponent.defaultProps = {};

export default RegionsListComponent;

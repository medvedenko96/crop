import React from 'react';
import { func, bool, number, object } from 'prop-types';
import classNames from 'classnames/bind';

/* @Antd */
import { Button, List } from 'antd';

/* @Components */
import { CreateFieldModal, UpdateFieldModal } from 'components/Modals';
import { actionItemsFieldPage, actionItemsDashboardPage } from './actionsItem';

/* @Styles */
import styles from './FieldsList.module.css';

const cx = classNames.bind(styles);

const propTypes = {
	intl: object,
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
	onOpenFieldClick: func,
	onDeleteField: func,
	onUpdateField: func,
	onOpenUpdateFieldModal: func,
	isFieldPage: bool,
};

const FieldsListComponent = ({
	intl,
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
	onOpenFieldClick,
	onDeleteField,
	onUpdateField,
	onOpenUpdateFieldModal,
	isFieldPage,
}) => {
	const currentFieldsIds = fieldsIds[regionId] || [];

	const actionsItem = (id) =>
		isFieldPage
			? actionItemsFieldPage(id, intl, onOpenUpdateFieldModal, onDeleteField)
			: actionItemsDashboardPage(
					id,
					intl,
					onOpenFieldClick,
					onOpenUpdateFieldModal,
					onDeleteField
			  );

	return (
		<>
			<div className={styles.listWrapper}>
				<List
					header={
						<div className={styles.listTitle}>
							{intl.formatMessage({ id: 'fields' })}
						</div>
					}
					dataSource={currentFieldsIds}
					size="small"
					className={cx(styles.fieldsList, { fieldsListHeight: isFieldPage })}
					renderItem={(id) => {
						const activeItem = currentFieldId === id;

						return (
							<List.Item
								className={cx(styles.listItem, {
									listItemActive: activeItem,
								})}
								key={id}
								onDoubleClick={() => onOpenFieldClick(id)}
								onClick={() =>
									isFieldPage ? onOpenFieldClick(id) : onFieldClick(id)
								}
								actions={actionsItem(id)}
							>
								<div
									className={cx(styles.listActionText, {
										listActionTextActive: activeItem,
									})}
								>
									{fieldsById[id].name}
								</div>
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
					{intl.formatMessage({ id: 'field.add' })}
				</Button>
			</div>
			<CreateFieldModal
				intl={intl}
				isShowModal={isShowCreateFieldModal}
				onOk={onSubmitCreateFieldModal}
				handleCancel={onCancelModal}
			/>
			<UpdateFieldModal
				intl={intl}
				isShowModal={isShowUpdateFieldModal}
				onOk={onUpdateField}
				handleCancel={onCancelModal}
				fieldInfo={fieldsById[currentFieldId]}
			/>
		</>
	);
};

FieldsListComponent.propTypes = propTypes;

FieldsListComponent.displayName = 'FieldsListComponent';

FieldsListComponent.defaultProps = {};

export default FieldsListComponent;

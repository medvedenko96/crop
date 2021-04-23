import React from 'react';

/* @Antd */
import { Popconfirm } from 'antd';

/* @Icons */
import CheckCircleOutlined from '@ant-design/icons/CheckCircleOutlined';
import CloseCircleOutlined from '@ant-design/icons/CloseCircleOutlined';
import EditOutlined from '@ant-design/icons/EditOutlined';
import DeleteOutlined from '@ant-design/icons/DeleteOutlined';

/* @Styles */
import styles from './NormBotTable.module.css';

export const initialDataMapper = (initialData) =>
	Object.keys(initialData).map((key) => ({
		...initialData[key],
		key: initialData[key].rowKey,
	}));

export const addDefaultRow = (length) => ({
	key: length + 1,
	rowNumber: length + 1,
	controlNorm: 0,
	controlYield: 0,
	controlSquare: 0,
	experimentNorm: 0,
	experimentYield: 0,
	experimentSquare: 0,
});

export const getTableStaff = ({
	cx,
	intl,
	editingKey,
	isEditing,
	onEdit,
	onDelete,
	onCancel,
	onSave,
	Item,
}) => {
	const columns = [
		{
			title: '№',
			dataIndex: 'rowNumber',
			align: 'center',
			editable: true,
			width: 80,
			showSorterTooltip: false,
			sorter: (a, b) => a.rowNumber - b.rowNumber,
			render: (value) => <div className={styles.value}>{value}</div>,
		},
		{
			title: intl.formatMessage({ id: 'normBot.control' }),
			children: [
				{
					title: intl.formatMessage({ id: 'normBot.norm' }),
					dataIndex: 'controlNorm',
					align: 'center',
					width: 200,
					editable: true,
					render: (value) => <div className={styles.value}>{value}</div>,
				},
				{
					title: intl.formatMessage({ id: 'normBot.yield' }),
					dataIndex: 'controlYield',
					width: 200,
					align: 'center',
					editable: true,
					render: (value) => <div className={styles.value}>{value}</div>,
				},
				{
					title: intl.formatMessage({ id: 'normBot.square' }),
					dataIndex: 'controlSquare',
					width: 200,
					align: 'center',
					editable: true,
					render: (value) => <div className={styles.value}>{value}</div>,
				},
			],
		},
		{
			title: intl.formatMessage({ id: 'normBot.experiment' }),
			children: [
				{
					title: intl.formatMessage({ id: 'normBot.norm' }),
					dataIndex: 'experimentNorm',
					width: 200,
					align: 'center',
					editable: true,
					render: (value) => <div className={styles.value}>{value}</div>,
				},
				{
					title: intl.formatMessage({ id: 'normBot.yield' }),
					dataIndex: 'experimentYield',
					width: 200,
					align: 'center',
					editable: true,
					render: (value) => <div className={styles.value}>{value}</div>,
				},
				{
					title: intl.formatMessage({ id: 'normBot.square' }),
					dataIndex: 'experimentSquare',
					width: 200,
					align: 'center',
					editable: true,
					render: (value) => <div className={styles.value}>{value}</div>,
				},
			],
		},
		{
			title: '',
			dataIndex: 'operation',
			render: (_, record) => {
				const editable = isEditing(record);

				if (editable) {
					return (
						<div className={styles.iconWrapper}>
							<CheckCircleOutlined
								className={styles.saveIcon}
								onClick={() => onSave(record.key)}
							/>
							<CloseCircleOutlined className={styles.cancelIcon} onClick={onCancel} />
						</div>
					);
				}

				return (
					<div className={cx(styles.iconWrapper, { iconDisabled: editingKey !== '' })}>
						<EditOutlined className={styles.editIcon} onClick={() => onEdit(record)} />
						<Popconfirm
							className={styles.deleteIconWrapper}
							title={intl.formatMessage({ id: 'normBot.deleteRowConfirm' })}
							cancelText={intl.formatMessage({ id: 'confirm.no' })}
							okText={intl.formatMessage({ id: 'confirm.yes' })}
							onConfirm={() => onDelete(record)}
						>
							<DeleteOutlined className={styles.deleteIcon} />{' '}
						</Popconfirm>
					</div>
				);
			},
		},
	];

	const mergedColumns = (columns) =>
		columns.map((col) => {
			if (col.children) {
				return {
					...col,
					children: mergedColumns(col.children),
				};
			}

			if (!col.editable) {
				return col;
			}

			return {
				...col,
				onCell: (record) => ({
					Item,
					record,
					dataIndex: col.dataIndex,
					editing: isEditing(record),
				}),
			};
		});

	return { mergedColumns: mergedColumns(columns) };
};

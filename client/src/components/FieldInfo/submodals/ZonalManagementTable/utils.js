import React from 'react';

/* @Icons */
import FormOutlined from '@ant-design/icons/FormOutlined';
import CheckCircleOutlined from '@ant-design/icons/CheckCircleOutlined';
import CloseCircleOutlined from '@ant-design/icons/CloseCircleOutlined';

/* @Utils */
import { arrayToObject } from 'utils/normalized';

const rows = [
	'A',
	'highLevelZoneCheck',
	'lowLevelZoneCheck',
	'B',
	'highLevelZoneCheckB',
	'lowLevelZoneCheckB',
	'C',
	'highLevelZoneCheckC',
	'lowLevelZoneCheckC',
];

const mergeRows = (baseRows, initialRows) => {
	if (!initialRows) {
		return baseRows;
	}

	return rows.map((row) => ({
		...arrayToObject(baseRows, 'key')[row],
		...initialRows[row],
	}));
};

export const getTableStaff = ({
	cx,
	intl,
	styles,
	editingKey,
	initialData,
	isEditing,
	onEdit,
	onCancel,
	onSave,
	Item,
}) => {
	const rows = [
		{
			key: 'A',
			color: 'green',
			zonalManagement: intl.formatMessage({ id: 'zonalManagement.a' }),
			yieldCapacity: 0,
			actualPopulation: 0,
			plantingDensity: 0,
			hectares: 0,
		},
		{
			key: 'highLevelZoneCheck',
			color: '#f7f7f7',
			zonalManagement: intl.formatMessage({ id: 'zonalManagement.highLevelZoneCheck' }),
			yieldCapacity: 0,
			actualPopulation: 0,
			plantingDensity: 0,
			hectares: 0,
		},
		{
			key: 'lowLevelZoneCheck',
			color: 'orange',
			zonalManagement: intl.formatMessage({ id: 'zonalManagement.lowLevelZoneCheck' }),
			yieldCapacity: 0,
			actualPopulation: 0,
			plantingDensity: 0,
			hectares: 0,
		},
		{
			key: 'B',
			color: '#b5db72',
			zonalManagement: intl.formatMessage({ id: 'zonalManagement.b' }),
			yieldCapacity: 0,
			actualPopulation: 0,
			plantingDensity: 0,
			hectares: 0,
		},
		{
			key: 'highLevelZoneCheckB',
			color: 'black',
			zonalManagement: intl.formatMessage({ id: 'zonalManagement.highLevelZoneCheckB' }),
			yieldCapacity: 0,
			actualPopulation: 0,
			plantingDensity: 0,
			hectares: 0,
		},
		{
			key: 'lowLevelZoneCheckB',
			color: 'grey',
			zonalManagement: intl.formatMessage({ id: 'zonalManagement.lowLevelZoneCheckB' }),
			yieldCapacity: 0,
			actualPopulation: 0,
			plantingDensity: 0,
			hectares: 0,
		},
		{
			key: 'C',
			color: '#ff5959',
			zonalManagement: intl.formatMessage({ id: 'zonalManagement.c' }),
			yieldCapacity: 0,
			actualPopulation: 0,
			plantingDensity: 0,
			hectares: 0,
		},
		{
			key: 'highLevelZoneCheckC',
			color: '#0c30cf',
			zonalManagement: intl.formatMessage({ id: 'zonalManagement.highLevelZoneCheckC' }),
			yieldCapacity: 0,
			actualPopulation: 0,
			plantingDensity: 0,
			hectares: 0,
		},
		{
			key: 'lowLevelZoneCheckC',
			color: '#30d5c8',
			zonalManagement: intl.formatMessage({ id: 'zonalManagement.lowLevelZoneCheckC' }),
			yieldCapacity: 0,
			actualPopulation: 0,
			plantingDensity: 0,
			hectares: 0,
		},
	];

	const columns = [
		{
			title: '',
			dataIndex: 'color',
			width: 20,
			render: (color) => (
				<div className={styles.colorCube} style={{ backgroundColor: color }} />
			),
		},
		{
			title: intl.formatMessage({ id: 'zonalManagement.name' }),
			dataIndex: 'zonalManagement',
			align: 'center',
			render: (title) => <div className={styles.title}>{title}</div>,
		},
		{
			title: intl.formatMessage({ id: 'yieldCapacity' }),
			dataIndex: 'yieldCapacity',
			editable: true,
			width: 200,
			align: 'center',
			render: (value) => <div className={styles.value}>{value}</div>,
		},
		{
			title: intl.formatMessage({ id: 'actualPopulation' }),
			dataIndex: 'actualPopulation',
			editable: true,
			width: 200,
			align: 'center',
			render: (value) => <div className={styles.value}>{value}</div>,
		},
		{
			title: intl.formatMessage({ id: 'plantingDensity' }),
			dataIndex: 'plantingDensity',
			editable: true,
			width: 200,
			align: 'center',
			render: (value) => <div className={styles.value}>{value}</div>,
		},
		{
			title: intl.formatMessage({ id: 'hectares' }),
			dataIndex: 'hectares',
			editable: true,
			width: 200,
			align: 'center',
			render: (value) => <div className={styles.value}>{value}</div>,
		},
		{
			title: '',
			dataIndex: 'operation',
			width: 20,
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
						<FormOutlined className={styles.editIcon} onClick={() => onEdit(record)} />
					</div>
				);
			},
		},
	];

	const mergedColumns = columns.map((col) => {
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

	return { rows: mergeRows(rows, initialData), mergedColumns };
};

import React from 'react';

/* @Icons */
import FormOutlined from '@ant-design/icons/FormOutlined';
import CheckCircleOutlined from '@ant-design/icons/CheckCircleOutlined';
import CloseCircleOutlined from '@ant-design/icons/CloseCircleOutlined';

export const getTableStaff = ({
	cx,
	intl,
	styles,
	editingKey,
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
			yield: 0,
			actualPopulation: 0,
			plantingDensity: 0,
			hectares: 0,
		},
		{
			key: 'highLevelZoneCheck',
			color: '#f7f7f7',
			zonalManagement: intl.formatMessage({ id: 'zonalManagement.highLevelZoneCheck' }),
			yield: 0,
			actualPopulation: 0,
			plantingDensity: 0,
			hectares: 0,
		},
		{
			key: 'lowLevelZoneCheck',
			color: 'orange',
			zonalManagement: intl.formatMessage({ id: 'zonalManagement.lowLevelZoneCheck' }),
			yield: 0,
			actualPopulation: 0,
			plantingDensity: 0,
			hectares: 0,
		},
		{
			key: 'B',
			color: '#b5db72',
			zonalManagement: intl.formatMessage({ id: 'zonalManagement.b' }),
			yield: 0,
			actualPopulation: 0,
			plantingDensity: 0,
			hectares: 0,
		},
		{
			key: 'highLevelZoneCheckB',
			color: 'black',
			zonalManagement: intl.formatMessage({ id: 'zonalManagement.highLevelZoneCheckB' }),
			yield: 0,
			actualPopulation: 0,
			plantingDensity: 0,
			hectares: 0,
		},
		{
			key: 'lowLevelZoneCheckB',
			color: 'grey',
			zonalManagement: intl.formatMessage({ id: 'zonalManagement.lowLevelZoneCheckB' }),
			yield: 0,
			actualPopulation: 0,
			plantingDensity: 0,
			hectares: 0,
		},
		{
			key: 'C',
			color: '#ff5959',
			zonalManagement: intl.formatMessage({ id: 'zonalManagement.c' }),
			yield: 0,
			actualPopulation: 0,
			plantingDensity: 0,
			hectares: 0,
		},
		{
			key: 'highLevelZoneCheckC',
			color: '#0c30cf',
			zonalManagement: intl.formatMessage({ id: 'zonalManagement.highLevelZoneCheckC' }),
			yield: 0,
			actualPopulation: 0,
			plantingDensity: 0,
			hectares: 0,
		},
		{
			key: 'lowLevelZoneCheckC',
			color: '#30d5c8',
			zonalManagement: intl.formatMessage({ id: 'zonalManagement.lowLevelZoneCheckC' }),
			yield: 0,
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
		},
		{
			title: intl.formatMessage({ id: 'yield' }),
			dataIndex: 'yield',
			editable: true,
		},
		{
			title: intl.formatMessage({ id: 'actualPopulation' }),
			dataIndex: 'actualPopulation',
			editable: true,
		},
		{
			title: intl.formatMessage({ id: 'plantingDensity' }),
			dataIndex: 'plantingDensity',
			editable: true,
		},
		{
			title: intl.formatMessage({ id: 'hectares' }),
			dataIndex: 'hectares',
			editable: true,
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

	return { rows, mergedColumns };
};

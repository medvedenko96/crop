import React from 'react';
import { shape, string, object, func } from 'prop-types';

/* @Components */
import ZonalManagementTable from './submodals/ZonalManagementTable';
import NormBotTable from './submodals/NormBotTable';

/* @Antd */
import { Input } from 'antd';

/* @Utils */
import { capitalizeFirstLetter } from 'utils/capitalizeFirstLetter';

/* @Styles */
import styles from './FieldInfo.module.css';

const { TextArea } = Input;

const propTypes = {
	intl: object,
	currentField: shape({ crop: string }),
	description: string,
	onTextAreaChange: func,
};

const FieldInfoComponent = ({ intl, currentField, description, onTextAreaChange }) => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.cropTitle}>
				{intl.formatMessage(
					{ id: 'crop' },
					{ crop: capitalizeFirstLetter(currentField.crop) }
				)}
			</div>
			<div className={styles.content}>
				<div className={styles.titleAndDescription}>
					<TextArea
						value={description}
						onChange={onTextAreaChange}
						placeholder="Опис, коментар для замовника"
						autoSize={{ minRows: 5, maxRows: 8 }}
					/>
				</div>
			</div>
			<ZonalManagementTable />
			<NormBotTable />
		</div>
	);
};

FieldInfoComponent.propTypes = propTypes;

FieldInfoComponent.displayName = 'FieldInfoContainer';

FieldInfoComponent.defaultProps = {
	currentField: {
		crop: '',
		zonalManagement: [],
	},
};

export default FieldInfoComponent;

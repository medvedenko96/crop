import React from 'react';
import { shape, string, object, func, array } from 'prop-types';

/* @Components */
import ZonalManagementTable from './submodals/ZonalManagementTable';
import NormBotTable from './submodals/NormBotTable';

/* @Antd */
import { Input, Upload } from 'antd';

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
	onUploadChange: func,
	onPreview: func,
	fileList: array,
};

const FieldInfoComponent = ({
	intl,
	currentField,
	description,
	onTextAreaChange,
	onUploadChange,
	onPreview,
	fileList,
}) => {
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
				<div className={styles.upload}>
					<Upload
						listType="picture-card"
						fileList={fileList}
						onChange={onUploadChange}
						onPreview={onPreview}
					>
						{fileList.length < 3 && '+ Upload'}
					</Upload>
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

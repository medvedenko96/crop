import React from 'react';
import { shape, string, object, func } from 'prop-types';

/* @Components */
import ZonalManagementTable from './submodals/ZonalManagementTable';
import NormBotTable from './submodals/NormBotTable';

/* @Antd */
import { Input, Button } from 'antd';

/* @Utils */
import { capitalizeFirstLetter } from 'utils/capitalizeFirstLetter';

/* @Styles */
import styles from './FieldInfo.module.css';

const { TextArea } = Input;

const propTypes = {
	intl: object,
	description: string,
	imgUrl: string,
	onTextAreaChange: func,
	onSaveDescriptionClick: func,
	onInputChange: func,
	onSaveImgUrlClick: func,
	currentField: shape({
		crop: string,
		description: string,
		imgUrl: string,
	}),
};

const FieldInfoComponent = ({
	intl,
	currentField,
	description,
	imgUrl,
	onTextAreaChange,
	onSaveDescriptionClick,
	onInputChange,
	onSaveImgUrlClick,
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
				<div className={styles.descriptionContent}>
					<TextArea
						className={styles.description}
						value={description}
						onChange={onTextAreaChange}
						placeholder={intl.formatMessage({ id: 'description.placeholder' })}
						autoSize={{ minRows: 1, maxRows: 5 }}
					/>
					<Button
						disabled={description === currentField.description}
						onClick={onSaveDescriptionClick}
						className={styles.buttonWrapper}
					>
						{intl.formatMessage({ id: 'description.buttonSave' })}
					</Button>
				</div>
				<div className={styles.imgUrlInputContent}>
					<Input
						value={imgUrl}
						onChange={onInputChange}
						className={styles.imgUrlInput}
						placeholder={intl.formatMessage({ id: 'imgUrl.placeholder' })}
					/>
					<Button
						disabled={imgUrl === currentField.imgUrl}
						onClick={onSaveImgUrlClick}
						className={styles.buttonWrapper}
					>
						{intl.formatMessage({ id: 'imgUrl.buttonSave' })}
					</Button>
					<Button disabled={!currentField.imgUrl} className={styles.buttonWrapper}>
						{intl.formatMessage({ id: 'imgUrl.openImg' })}
					</Button>
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

import React from 'react';
import { shape, string, object, func } from 'prop-types';

/* @Components */
import ZonalManagementTable from './submodals/ZonalManagementTable';
import NormBotTable from './submodals/NormBotTable';
import Files from './submodals/Files';

/* @Antd */
import { Input, Button, Image } from 'antd';

/* @Utils */
import { capitalizeFirstLetter } from 'utils/capitalizeFirstLetter';

/* @Styles */
import styles from './FieldInfo.module.css';

const FALLBACK =
	'data:image/png;base64,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';
const WIDTH_IMG = 200;

const { TextArea } = Input;

const propTypes = {
	intl: object,
	description: string,
	imgYield: string,
	imgControlArea: string,
	onTextAreaChange: func,
	onSaveDescriptionClick: func,
	onInputForImgYield: func,
	onSaveImgYieldClick: func,
	onInputForImgControlArea: func,
	onSaveImgControlAreaClick: func,
	currentField: shape({
		crop: string,
		description: string,
		imgYield: string,
	}),
};

const FieldInfoComponent = ({
	intl,
	currentField,
	description,
	imgYield,
	imgControlArea,
	onTextAreaChange,
	onSaveDescriptionClick,
	onInputForImgYield,
	onSaveImgYieldClick,
	onInputForImgControlArea,
	onSaveImgControlAreaClick,
}) => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.content}>
				<div className={styles.mainInfo}>
					<div className={styles.cropTitle}>
						{intl.formatMessage(
							{ id: 'crop' },
							{ crop: capitalizeFirstLetter(currentField.crop) }
						)}
					</div>
					<div className={styles.inputs}>
						<div className={styles.descriptionContent}>
							<TextArea
								className={styles.description}
								value={description}
								onChange={onTextAreaChange}
								placeholder={intl.formatMessage({ id: 'description.placeholder' })}
								autoSize={{ minRows: 10, maxRows: 15 }}
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
							<div className={styles.imgName}>
								{intl.formatMessage({ id: 'imgUrl.yieldMap' })}
							</div>
							<div className={styles.imgWrapper}>
								{imgControlArea ? (
									<Image width={WIDTH_IMG} src={imgYield} fallback={FALLBACK} />
								) : (
									<Image width={WIDTH_IMG} src={FALLBACK} />
								)}
							</div>
							<Input
								value={imgYield}
								onChange={onInputForImgYield}
								placeholder={intl.formatMessage({ id: 'imgUrl.placeholder' })}
							/>
							<Button
								disabled={imgYield === currentField.imgYield}
								onClick={onSaveImgYieldClick}
								className={styles.buttonWrapper}
							>
								{intl.formatMessage({ id: 'imgUrl.buttonSave' })}
							</Button>
						</div>

						<div className={styles.imgUrlInputContent}>
							<div className={styles.imgName}>
								{intl.formatMessage({ id: 'imgUrl.controlArea' })}
							</div>
							<div className={styles.imgWrapper}>
								{imgControlArea ? (
									<Image
										width={WIDTH_IMG}
										src={imgControlArea}
										fallback={FALLBACK}
									/>
								) : (
									<Image width={WIDTH_IMG} src={FALLBACK} />
								)}
							</div>
							<Input
								value={imgControlArea}
								onChange={onInputForImgControlArea}
								placeholder={intl.formatMessage({ id: 'imgUrl.placeholder' })}
							/>
							<Button
								disabled={imgControlArea === currentField.imgControlArea}
								onClick={onSaveImgControlAreaClick}
								className={styles.buttonWrapper}
							>
								{intl.formatMessage({ id: 'imgUrl.buttonSave' })}
							</Button>
						</div>
					</div>
				</div>
			</div>
			<Files />
			<NormBotTable />
			<ZonalManagementTable />
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

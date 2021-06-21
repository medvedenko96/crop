import React, { useState } from 'react';
import { shape, string, func } from 'prop-types';
import { connect } from 'react-redux';
import { useIntl } from 'react-intl';

/* @Components */
import FieldInfoComponent from './FieldInfoComponent';

/* @Antd */
import { message as antdMessage } from 'antd';

/* @Actions */
import {
	setImgControlAreaAction,
	setImgYieldAction,
	setDescriptionAction,
} from 'store/year/actions';

/* @Selectors */
import { getYearsSelector } from 'store/year/selectors';

const notification = (type, message) => antdMessage[type](message);

const propTypes = {
	setImgYield: func,
	saveDescription: func,
	setImgControlArea: func,
	currentField: shape({
		crop: string,
		description: string,
		imgYield: string,
	}),
};

const FieldInfoContainer = ({ setImgYield, setImgControlArea, saveDescription, currentField }) => {
	const intl = useIntl();
	const [description, setDescription] = useState(currentField.description);
	const [imgYield, _setImgYield] = useState(currentField.imgYield);
	const [imgControlArea, _setImgControlArea] = useState(currentField.imgControlArea);

	const handleTextAreaChange = ({ target: { value } }) => setDescription(value);

	const handleSaveDescriptionClick = async () => {
		const { isSuccess, message } = await saveDescription(description);

		isSuccess
			? notification('success', intl.formatMessage({ id: message }))
			: notification('warning', intl.formatMessage({ id: message }));
	};

	const handleInputForImgYield = ({ target: { value } }) => _setImgYield(value);

	const handleSaveImgYieldClick = async () => {
		const { isSuccess, message } = await setImgYield(imgYield);

		isSuccess
			? notification('success', intl.formatMessage({ id: message }))
			: notification('warning', intl.formatMessage({ id: message }));
	};

	const handleInputForImgControlArea = ({ target: { value } }) => _setImgControlArea(value);

	const handleSaveImgControlAreaClick = async () => {
		const { isSuccess, message } = await setImgControlArea(imgControlArea);

		isSuccess
			? notification('success', intl.formatMessage({ id: message }))
			: notification('warning', intl.formatMessage({ id: message }));
	};

	return (
		<FieldInfoComponent
			intl={intl}
			currentField={currentField}
			description={description}
			imgYield={imgYield}
			imgControlArea={imgControlArea}
			onTextAreaChange={handleTextAreaChange}
			onSaveDescriptionClick={handleSaveDescriptionClick}
			onInputForImgYield={handleInputForImgYield}
			onSaveImgYieldClick={handleSaveImgYieldClick}
			onInputForImgControlArea={handleInputForImgControlArea}
			onSaveImgControlAreaClick={handleSaveImgControlAreaClick}
		/>
	);
};

FieldInfoContainer.defaultProps = {
	currentField: {
		crop: '',
		description: '',
		imgYield: '',
	},
};
FieldInfoContainer.propTypes = propTypes;
FieldInfoContainer.displayName = 'FieldInfoContainer';

const mapDispatchToProps = {
	setImgControlArea: setImgControlAreaAction,
	setImgYield: setImgYieldAction,
	saveDescription: setDescriptionAction,
};

const mapStateToProps = (state) => {
	const { yearsById, currentYearId } = getYearsSelector(state);

	return { currentField: yearsById[currentYearId] };
};

export default connect(mapStateToProps, mapDispatchToProps)(FieldInfoContainer);

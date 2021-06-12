import React, { useState } from 'react';
import { shape, string, func } from 'prop-types';
import { connect } from 'react-redux';
import { useIntl } from 'react-intl';

/* @Components */
import FieldInfoComponent from './FieldInfoComponent';

/* @Antd */
import { message as antdMessage } from 'antd';

/* @Actions */
import { setImgUrlAction, setDescriptionAction } from 'store/year/actions';

/* @Selectors */
import { getYearsSelector } from 'store/year/selectors';

const notification = (type, message) => antdMessage[type](message);

const propTypes = {
	saveImgUrl: func,
	saveDescription: func,
	currentField: shape({
		crop: string,
		description: string,
		imgUrl: string,
	}),
};

const FieldInfoContainer = ({ saveImgUrl, saveDescription, currentField }) => {
	const intl = useIntl();
	const [description, setDescription] = useState(currentField.description);
	const [imgUrl, setImgUrl] = useState(currentField.imgUrl);

	const handleTextAreaChange = ({ target: { value } }) => setDescription(value);

	const handleSaveDescriptionClick = async () => {
		const { isSuccess, message } = await saveDescription(description);

		isSuccess
			? notification('success', intl.formatMessage({ id: message }))
			: notification('warning', intl.formatMessage({ id: message }));
	};

	const handleInputChange = ({ target: { value } }) => setImgUrl(value);

	const handleSaveImgUrlClick = async () => {
		const { isSuccess, message } = await saveImgUrl(imgUrl);

		isSuccess
			? notification('success', intl.formatMessage({ id: message }))
			: notification('warning', intl.formatMessage({ id: message }));
	};

	return (
		<FieldInfoComponent
			intl={intl}
			currentField={currentField}
			description={description}
			imgUrl={imgUrl}
			onTextAreaChange={handleTextAreaChange}
			onSaveDescriptionClick={handleSaveDescriptionClick}
			onInputChange={handleInputChange}
			onSaveImgUrlClick={handleSaveImgUrlClick}
		/>
	);
};

FieldInfoContainer.defaultProps = {
	currentField: {
		crop: '',
		description: '',
		imgUrl: '',
	},
};
FieldInfoContainer.propTypes = propTypes;
FieldInfoContainer.displayName = 'FieldInfoContainer';

const mapDispatchToProps = {
	saveImgUrl: setImgUrlAction,
	saveDescription: setDescriptionAction,
};

const mapStateToProps = (state) => {
	const { yearsById, currentYearId } = getYearsSelector(state);

	return { currentField: yearsById[currentYearId] };
};

export default connect(mapStateToProps, mapDispatchToProps)(FieldInfoContainer);

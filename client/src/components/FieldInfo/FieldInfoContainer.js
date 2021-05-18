import React, { useState } from 'react';
import { shape, string, func } from 'prop-types';
import { connect } from 'react-redux';
import { useIntl } from 'react-intl';

/* @Components */
import FieldInfoComponent from './FieldInfoComponent';

/* @Actions */

/* @Selectors */
import { getYearsSelector } from 'store/year/selectors';

const propTypes = {
	uploadPhotoField: func,
	currentField: shape({ crop: string }),
};

const FieldInfoContainer = ({ currentField }) => {
	const intl = useIntl();
	const [description, setDescription] = useState('');

	const handleTextAreaChange = ({ target: { value } }) => {
		setDescription(value);
	};

	return (
		<FieldInfoComponent
			intl={intl}
			currentField={currentField}
			description={description}
			onTextAreaChange={handleTextAreaChange}
		/>
	);
};

FieldInfoContainer.propTypes = propTypes;

FieldInfoContainer.displayName = 'FieldInfoContainer';

const mapDispatchToProps = {};

const mapStateToProps = (state) => {
	const { yearsById, currentYearId } = getYearsSelector(state);

	return { currentField: yearsById[currentYearId] };
};

export default connect(mapStateToProps, mapDispatchToProps)(FieldInfoContainer);

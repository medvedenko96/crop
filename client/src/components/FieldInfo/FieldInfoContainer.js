import React, { useState } from 'react';
import { shape, string } from 'prop-types';
import { connect } from 'react-redux';
import { useIntl } from 'react-intl';

/* @Components */
import FieldInfoComponent from './FieldInfoComponent';

/* @Selectors */
import { getYearsSelector } from 'store/year/selectors';

const propTypes = {
	currentField: shape({ crop: string }),
};

const FieldInfoContainer = ({ currentField }) => {
	const intl = useIntl();
	const [description, setDescription] = useState('');
	const [fileList, setFileList] = useState([
		{
			uid: '-1',
			name: 'image.png',
			status: 'done',
			url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
		},
	]);

	const handleUploadChange = ({ fileList: newFileList }) => {
		setFileList(newFileList);
	};

	const handlePreview = async (file) => {
		let src = file.url;
		if (!src) {
			src = await new Promise((resolve) => {
				const reader = new FileReader();
				reader.readAsDataURL(file.originFileObj);
				reader.onload = () => resolve(reader.result);
			});
		}
		const image = new Image();
		image.src = src;
		const imgWindow = window.open(src);
		imgWindow.document.write(image.outerHTML);
	};

	const handleTextAreaChange = ({ target: { value } }) => {
		setDescription(value);
	};

	return (
		<FieldInfoComponent
			intl={intl}
			currentField={currentField}
			description={description}
			onTextAreaChange={handleTextAreaChange}
			onUploadChange={handleUploadChange}
			onPreview={handlePreview}
			fileList={fileList}
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

import React, { useEffect, useState } from 'react';
import { arrayOf, func, number, shape, string } from 'prop-types';
import { connect } from 'react-redux';
import { useIntl } from 'react-intl';

/* @Antd */
import { message as antdMessage } from 'antd';

/* @Components */
import FilesComponent from './FilesComponent';

/* @Actions */
import {
	getFilesAction,
	createFileAction,
	deleteFileAction,
	updateFileAction,
} from 'store/year/actions';

/* @Selectors */
import { getFilesSelector } from 'store/year/selectors';

const notification = (type, message) => antdMessage[type](message);
const FILE_MOCK = { id: 0, fileName: '', fileUrl: '' };

const propTypes = {
	getFiles: func,
	createFile: func,
	deleteFile: func,
	updateFile: func,
	files: arrayOf(
		shape({
			id: number,
			yearId: number,
			fileName: string,
			fileUrl: string,
		})
	),
};

const FilesContainer = ({ getFiles, createFile, updateFile, deleteFile, files }) => {
	const intl = useIntl();

	useEffect(() => {
		getFiles();
	}, []);

	const [isShowAddFieldModal, setIsShowAddFieldModal] = useState(false);
	const handleOpenAddFileModal = () => setIsShowAddFieldModal(true);
	const handleCancelAddFieldModal = () => setIsShowAddFieldModal(false);
	const handleSubmitAddFileModal = async ({ fileName, fileUrl }) => {
		const { isSuccess, message } = await createFile({ fileName, fileUrl });

		if (isSuccess) {
			notification('success', intl.formatMessage({ id: message }));
			setIsShowAddFieldModal(false);
			return;
		}

		notification('warning', intl.formatMessage({ id: message }));
	};

	const [isShowEditFieldModal, setIsShowEditFieldModal] = useState(false);
	const [currentFileInfo, setCurrentFileInfo] = useState(FILE_MOCK);
	const handleOpenEditFileModal = ({ id, fileName, fileUrl }) => {
		setCurrentFileInfo({ id, fileName, fileUrl });
		setIsShowEditFieldModal(true);
	};
	const handleCancelEditFieldModal = () => {
		setIsShowEditFieldModal(false);
		setCurrentFileInfo(FILE_MOCK);
	};

	const handleSubmitEditFileModal = async ({ fileName, fileUrl, id }) => {
		const { isSuccess, message } = await updateFile({ fileName, fileUrl, id });

		if (isSuccess) {
			notification('success', intl.formatMessage({ id: message }));
			setIsShowEditFieldModal(false);
			return;
		}

		notification('warning', intl.formatMessage({ id: message }));
	};

	const handleDeleteFile = async (id) => {
		const { isSuccess, message } = await deleteFile(id);

		isSuccess
			? notification('success', intl.formatMessage({ id: message }))
			: notification('warning', intl.formatMessage({ id: message }));
	};

	return (
		<FilesComponent
			intl={intl}
			files={files}
			isShowAddFieldModal={isShowAddFieldModal}
			onOpenAddFileModal={handleOpenAddFileModal}
			onCancelAddFieldModal={handleCancelAddFieldModal}
			onSubmitAddFileModal={handleSubmitAddFileModal}
			onDeleteFile={handleDeleteFile}
			isShowEditFieldModal={isShowEditFieldModal}
			onOpenEditFileModal={handleOpenEditFileModal}
			currentFileInfo={currentFileInfo}
			onSubmitEditFileModal={handleSubmitEditFileModal}
			onCancelEditFieldModal={handleCancelEditFieldModal}
		/>
	);
};

FilesContainer.defaultProps = {};
FilesContainer.propTypes = propTypes;
FilesContainer.displayName = 'FilesContainer';

const mapDispatchToProps = {
	getFiles: getFilesAction,
	createFile: createFileAction,
	deleteFile: deleteFileAction,
	updateFile: updateFileAction,
};

const mapStateToProps = (state) => {
	return { files: getFilesSelector(state) };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilesContainer);

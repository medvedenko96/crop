import React from 'react';
import { object, bool, func, shape, arrayOf, string, number } from 'prop-types';

/* @Components */
import { AddFile, EditFile } from 'components/Modals';

/* @Antd */
import { Button, List } from 'antd';

/* @Styles */
import styles from './Files.module.css';

const propTypes = {
	intl: object,
	files: arrayOf(
		shape({
			id: number,
			yearId: number,
			fileName: string,
			fileUrl: string,
		})
	),
	isShowAddFieldModal: bool,
	onOpenAddFileModal: func,
	onCancelAddFieldModal: func,
	onSubmitAddFileModal: func,
	onDeleteFile: func,
	isShowEditFieldModal: bool,
	onOpenEditFileModal: func,
	currentFileInfo: shape({
		id: number,
		fileName: string,
		fileUrl: string,
	}),
	onSubmitEditFileModal: func,
	onCancelEditFieldModal: func,
};

const FilesComponent = ({
	intl,
	files,
	isShowAddFieldModal,
	onOpenAddFileModal,
	onCancelAddFieldModal,
	onSubmitAddFileModal,
	onDeleteFile,
	isShowEditFieldModal,
	onOpenEditFileModal,
	currentFileInfo,
	onSubmitEditFileModal,
	onCancelEditFieldModal,
}) => {
	return (
		<>
			<div className={styles.wrapper}>
				<List
					header={
						<div className={styles.header}>
							<div>{intl.formatMessage({ id: 'file.list' })}</div>
							<Button onClick={onOpenAddFileModal}>
								{intl.formatMessage({ id: 'file.add' })}
							</Button>
						</div>
					}
					bordered
					dataSource={files}
					renderItem={({ id, fileName, fileUrl }) => (
						<List.Item
							key={id}
							actions={[
								<span
									onClick={() => onDeleteFile(id)}
									role="button"
									tabIndex={0}
									className={styles.action}
									key="list-loadmore-edit"
								>
									Видалити
								</span>,
								<span
									onClick={() => onOpenEditFileModal({ id, fileName, fileUrl })}
									role="button"
									tabIndex={0}
									className={styles.action}
									key="list-loadmore-more"
								>
									Редагувати
								</span>,
							]}
						>
							<a href={fileUrl} target="_blank" rel="noreferrer">
								{fileName}
							</a>
						</List.Item>
					)}
				/>
			</div>

			<AddFile
				intl={intl}
				isShowModal={isShowAddFieldModal}
				onOk={onSubmitAddFileModal}
				handleCancel={onCancelAddFieldModal}
			/>
			<EditFile
				intl={intl}
				isShowModal={isShowEditFieldModal}
				handleCancel={onCancelEditFieldModal}
				onOk={onSubmitEditFileModal}
				fileInfo={currentFileInfo}
			/>
		</>
	);
};

FilesComponent.defaultProps = {};
FilesComponent.propTypes = propTypes;
FilesComponent.displayName = 'FilesComponent';

export default FilesComponent;

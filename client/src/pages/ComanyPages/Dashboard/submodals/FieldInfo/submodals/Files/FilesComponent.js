import React from 'react';
import { arrayOf, shape, number, string } from 'prop-types';
import { useIntl } from 'react-intl';

/* @Antd */
import { List } from 'antd';

/* @Icons */
import FilePdfOutlined from '@ant-design/icons/FilePdfOutlined';

/* @Styles */
import styles from './Files.module.css';

const propTypes = {
	files: arrayOf(
		shape({
			id: number,
			fileName: string,
			fileUrl: string,
		})
	),
};

const FilesComponent = ({ files }) => {
	const intl = useIntl();

	return (
		<div className={styles.wrapper}>
			<List
				header={<div>{intl.formatMessage({ id: 'file._' })}</div>}
				size="small"
				dataSource={files}
				locale={{ emptyText: intl.formatMessage({ id: 'file.notUploaded' }) }}
				renderItem={({ id, fileName, fileUrl }) => (
					<List.Item key={id} className={styles.item}>
						<a className={styles.link} href={fileUrl} target="_blank" rel="noreferrer">
							<FilePdfOutlined
								style={{ fontSize: '16px', marginRight: 4, paddingBottom: 2 }}
							/>
							<span>{fileName}</span>
						</a>
					</List.Item>
				)}
			/>
		</div>
	);
};

FilesComponent.defaultProps = {
	files: [],
};
FilesComponent.propTypes = propTypes;
FilesComponent.displayName = 'FilesComponent';

export default FilesComponent;

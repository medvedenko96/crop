import React from 'react';
import { arrayOf, shape, number, string } from 'prop-types';

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
	return (
		<div className={styles.wrapper}>
			<List
				header={<div>Файли</div>}
				size="small"
				dataSource={files}
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

FilesComponent.defaultProps = {};
FilesComponent.propTypes = propTypes;
FilesComponent.displayName = 'FilesComponent';

export default FilesComponent;

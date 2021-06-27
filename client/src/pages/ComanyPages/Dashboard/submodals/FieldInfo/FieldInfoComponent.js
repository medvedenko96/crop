import React from 'react';
import { shape, string, object, array } from 'prop-types';

/* @Antd */
import { Image, Space } from 'antd';

/* @Components */
import NormBotSlider from './submodals/NormBotSlider';
import ZonalManagementTable from './submodals/ZonalManagementTable';
import Files from './submodals/Files';

/* @Utils */
import { capitalizeFirstLetter } from 'utils/capitalizeFirstLetter';

/* @Icons */
import AreaChartOutlined from '@ant-design/icons/AreaChartOutlined';
import ZoomInOutlined from '@ant-design/icons/ZoomInOutlined';

/* @Styles */
import styles from './FieldInfo.module.css';

const propTypes = {
	intl: object,
	currentYear: shape({
		crop: string,
		normBot: object,
		description: string,
		imgYield: string,
		imgControlArea: string,
		files: array,
	}),
};

const FieldInfoComponent = ({ intl, currentYear }) => {
	const {
		imgControlArea,
		imgYield,
		description,
		normBot,
		crop,
		zonalManagement,
		files,
	} = currentYear;

	return (
		<div>
			<div className={styles.cropTitle}>
				<AreaChartOutlined
					style={{ fontSize: '32px', color: '#1DA57A', marginRight: 8, paddingBottom: 6 }}
				/>
				{intl.formatMessage({ id: 'crop' }, { crop: capitalizeFirstLetter(crop) })}
			</div>
			{description && <div className={styles.description}>{description}</div>}
			<div className={styles.imagesWrapper}>
				{imgControlArea && (
					<div className={styles.imageWrapper}>
						<Image
							width={350}
							src={imgControlArea}
							alt={intl.formatMessage({ id: 'imgUrl.yieldMap' })}
							preview={{
								maskClassName: 'customize-mask',
								mask: (
									<Space direction="vertical" align="center">
										<ZoomInOutlined />
										{intl.formatMessage({ id: 'imgUrl.zoom' })}
									</Space>
								),
							}}
						/>
						<div className={styles.imageTitle}>
							{intl.formatMessage({ id: 'imgUrl.yieldMap' })}
						</div>
					</div>
				)}
				{imgYield && (
					<div className={styles.imageWrapper}>
						<Image
							width={350}
							src={imgYield}
							alt={intl.formatMessage({ id: 'imgUrl.controlArea' })}
							preview={{
								maskClassName: 'customize-mask',
								mask: (
									<Space direction="vertical" align="center">
										<ZoomInOutlined />
										{intl.formatMessage({ id: 'imgUrl.zoom' })}
									</Space>
								),
							}}
						/>
						<div className={styles.imageTitle}>
							{intl.formatMessage({ id: 'imgUrl.controlArea' })}
						</div>
					</div>
				)}
				<Files files={files} />
			</div>
			<ZonalManagementTable zonalManagement={zonalManagement} />
			<NormBotSlider normBot={normBot} />
		</div>
	);
};

FieldInfoComponent.defaultProps = {
	currentYear: {
		crop: '',
		normBot: {},
		zonalManagement: {},
		imgControlArea: '',
		imgYield: '',
		description: '',
		files: [],
	},
};
FieldInfoComponent.propTypes = propTypes;
FieldInfoComponent.displayName = 'FieldInfoComponent';

export default FieldInfoComponent;

import React, { useRef } from 'react';
import { object } from 'prop-types';
import classNames from 'classnames/bind';
import isEmpty from 'lodash/isEmpty';
import { useIntl } from 'react-intl';

/* @Antd */
import { Button } from 'antd';

/* @Icons */
import ArrowLeftOutlined from '@ant-design/icons/ArrowLeftOutlined';
import ArrowRightOutlined from '@ant-design/icons/ArrowRightOutlined';
import PicRightOutlined from '@ant-design/icons/PicRightOutlined';

/* @Hooks */
import useHorizontalScroll from 'hooks/useHorizontalScroll';

/* @Styles */
import styles from './NormBotSlider.module.css';

const cx = classNames.bind(styles);

const SCROLL_SHIFT = 900;

const propTypes = {
	normBot: object,
};

const NormBotSliderComponent = ({ normBot }) => {
	if (isEmpty(normBot)) {
		return null;
	}

	const intl = useIntl();
	const containerRef = useRef(null);
	const [scrollState, setScrollLeft] = useHorizontalScroll(containerRef);
	const keys = Object.keys(normBot);

	return (
		<nav className={styles.wrapper}>
			<div className={styles.container}>
				{!scrollState.isScrollPositionAtStart && (
					<div className={cx(styles.button_wrapper, styles.button_wrapper_left)}>
						<Button
							className={styles.button}
							shape="circle"
							size="large"
							onClick={() => setScrollLeft(scrollState.scrollLeft - SCROLL_SHIFT)}
							icon={<ArrowLeftOutlined style={{ color: '#d9d9d9' }} />}
						/>
					</div>
				)}
				{
					<ul ref={containerRef} className={styles.cards}>
						{keys.map((key) => {
							const {
								id,
								rowNumber,
								experimentNorm,
								experimentSquare,
								experimentYield,
								controlNorm,
								controlSquare,
								controlYield,
							} = normBot[key];

							return (
								<li className={styles.card} key={id}>
									<div className={styles.experiment}>
										<div className={styles.experimentNorm}>
											<div>{intl.formatMessage({ id: 'normBot.norm' })}</div>
											<div>{experimentNorm}</div>
										</div>
										<div className={styles.experimentYield}>
											<div>{intl.formatMessage({ id: 'normBot.yield' })}</div>
											<div>{experimentYield}</div>
										</div>
										<div className={styles.experimentSquare}>
											{intl.formatMessage(
												{ id: 'normBot.hectares' },
												{ count: experimentSquare }
											)}
										</div>
									</div>
									<div className={styles.control}>
										<div className={styles.controlNorm}>
											<div>{intl.formatMessage({ id: 'normBot.norm' })}</div>
											<div>{controlNorm}</div>
										</div>
										<div className={styles.controlYield}>
											<div>{intl.formatMessage({ id: 'normBot.yield' })}</div>
											<div>{controlYield}</div>
										</div>
										<div className={styles.controlSquare}>
											{intl.formatMessage(
												{ id: 'normBot.hectares' },
												{ count: controlSquare }
											)}
										</div>
									</div>
									<div className={styles.number}>
										<PicRightOutlined
											style={{ fontSize: '20px', color: '#ffffff' }}
										/>
										<div>{rowNumber}</div>
									</div>
								</li>
							);
						})}
					</ul>
				}
				{!scrollState.isScrollPositionAtEnd && (
					<div className={cx(styles.button_wrapper, styles.button_wrapper_right)}>
						<Button
							className={styles.button}
							shape="circle"
							size="large"
							onClick={() => setScrollLeft(scrollState.scrollLeft + SCROLL_SHIFT)}
							icon={<ArrowRightOutlined style={{ color: '#d9d9d9' }} />}
						/>
					</div>
				)}
			</div>
		</nav>
	);
};

NormBotSliderComponent.defaultProps = {
	normBot: {},
};
NormBotSliderComponent.propTypes = propTypes;
NormBotSliderComponent.displayName = 'NormBotSliderComponent';

export default NormBotSliderComponent;

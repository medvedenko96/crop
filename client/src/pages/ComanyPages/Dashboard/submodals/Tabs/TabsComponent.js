import React from 'react';
import { connect } from 'react-redux';

/* @Styles */
import styles from './Tabs.module.css';

const propTypes = {};

const TabsComponent = () => {
	return <div className={styles.wrapper}>TABS</div>;
};

TabsComponent.defaultProps = {};

TabsComponent.propTypes = propTypes;

TabsComponent.displayName = 'TabsComponent';

const mapStateToProps = () => {};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(TabsComponent);

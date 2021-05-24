import React from 'react';
import { connect } from 'react-redux';

/* @Components */
import TabsComponent from './TabsComponent';

const propTypes = {};

const TabsContainer = () => {
	return <TabsComponent />;
};

TabsContainer.defaultProps = {};

TabsContainer.propTypes = propTypes;

TabsContainer.displayName = 'TabsContainer';

const mapStateToProps = () => {};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(TabsContainer);
